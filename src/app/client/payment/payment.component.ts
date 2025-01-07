import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute for route parameters
import { GlobalService } from 'src/app/services/global.service';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm:any= FormGroup;
  totalAmount: number = 0;
  items: { productName: string; productPrice: number; quantity: number }[] = [];

  constructor(private fb: FormBuilder, 
      public formService: FormService,
      private cartService:CartService,
     private route: ActivatedRoute, private router:Router, private global:GlobalService,private apiService:ApiService, private toastr :ToastrService) { }

  ngOnInit(): void {
    this.global.isNavbarOpen = false;
    this.paymentForm = this.formService.paymentForm();

    // Fetch the data passed from the previous page
    this.route.queryParams.subscribe(params => {
      this.totalAmount = params['totalAmount'] || 0;
      this.items = JSON.parse(params['items'] || '[]');
    });

    // Watch for changes in the payment method and update the form controls accordingly
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe((value: string) => {
      this.updateFormControls(value);
    });

    // Initialize form control visibility
    this.updateFormControls(this.paymentForm.get('paymentMethod')?.value);
  }

  // Update form controls based on the selected payment method
  updateFormControls(method: string) {
    const methods = ['creditCard', 'paypal', 'netBanking', 'upi'];
    methods.forEach(m => {
      const control = this.paymentForm.get(m);
      if (control) {
        if (m === method) {
          control.setValidators([Validators.required]);
        } else {
          control.clearValidators();
        }
        control.updateValueAndValidity();
      }
    });
  }

//   paymentSubmit(): void {
//     if (this.paymentForm.valid) {
//       console.log('Payment form values:', this.paymentForm.value);
//       alert("Order done successfully");
//       this.router.navigate(['/home'] )  

//       // Handle form submission
//       // You might want to call a payment processing service here

//     } else {
    
//       alert("Order done successfully");
//       this.router.navigate(['/home'] ) ;
//          console.log('Form is invalid');
//     }
//   }
paymentSubmit(): void {
  if (this.paymentForm.valid) {
    const formValues = this.paymentForm.value;
    let paymentDetails = '';

    if (formValues.paymentMethod === 'creditCard') {
      paymentDetails = `Credit Card Number ${formValues.cardNumber}, CVV ${formValues.cvv}, Expiry Date ${formValues.expiryDate}`;
    } else if (formValues.paymentMethod === 'upi') {
      paymentDetails = `UPI ID ${formValues.upiId}`;
    }

    const orderData = {
      userId: this.global.userId, // Replace with actual user ID
      items: this.items,
      totalAmount: this.totalAmount,
      paymentMethod: formValues.paymentMethod,
      paymentDetails: paymentDetails
    };

    this.apiService.confirmOrder(orderData).subscribe(
      (response) => {
        alert("Order done successfully");
        this.toastr.success(response?.message)
        this.cartService.fetchCartItems(this.global.userId);
        // this.clearCart(); // Clear cart after successful order
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error confirming order:', error);
        alert("Order confirmation failed");
      }
    );
  } else {
    alert("Please complete the payment form");
  }
}


// clearCart() {
//   this.apiService.clearCart().subscribe(
//     (response) => {
//       console.log("Cart cleared successfully");
//     },
//     (error) => {
//       console.error('Error clearing cart:', error);
//     }
//   );
// }
}
