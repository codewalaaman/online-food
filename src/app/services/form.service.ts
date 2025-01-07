import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private fb: FormBuilder) {}

  createLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  addNewProduct():FormGroup{
    return this.fb.group({
      productId:[''],
      productName:[''],
      productDescription:[''],
      productPrice:[''],
      productImage:[''],
      productType:[''],
    })
  }
  editProductForm():FormGroup{
   return this.fb.group({
    productImage: ['', Validators.required],
    productName: ['', Validators.required],
    productType: ['', Validators.required],
    productPrice: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    productDescription: ['', Validators.required]
  });
}
  createSignupForm():FormGroup{
    return  this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
  createReservationForm() :FormGroup{
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      datetime: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]],
      requests: ['']
    });
  }
  contactForm():FormGroup{
    return this.fb.group({
      name:['',Validators.required],
      email:['',Validators.required],
      message:['',Validators.required]
    })

  } 
  paymentForm(): FormGroup{
    return this.fb.group({
      paymentMethod: ['creditCard', Validators.required],
      cardNumber: [''],
      expiryDate: [''],
      cvv: [''],
      upiId: ['']
    });
  }
  private passwordMatchValidator(form: FormGroup): void {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    }
  }
}
