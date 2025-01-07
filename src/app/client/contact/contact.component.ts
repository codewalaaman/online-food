import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { GlobalService } from 'src/app/services/global.service';
import { FormService } from 'src/app/services/form.service';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  contactForm:any=FormGroup;
  faqs = [
    { question: 'How do I track my order?', answer: 'You can track your order status in real-time through the tracking link sent to your email or SMS after placing an order.' },
    { question: 'What should I do if my order is late?', answer: 'If your order is delayed, please contact our support team using the information above, and we will assist you promptly.' },
    { question: 'Can I change or cancel my order?', answer: 'Orders can be changed or canceled within 10 minutes of placing them. Please contact support for assistance.' },
    { question: 'How can I provide feedback?', answer: 'We value your feedback! Please send us your thoughts through the contact form above, or reach out via our social media channels.' }
];
  constructor(private cartService: CartService, public global:GlobalService ,private formService:FormService , private apiService:ApiService , private router:Router) {}


ngOnInit(): void {
  this.contactForm=this.formService.contactForm();
  this.global.isNavbarOpen = false;
}
submitContact() {
  console.log("valuse",this.contactForm.value)
  if(this.contactForm.valid){
    this.contactForm.reset();
    this.router.navigate(['/home']);
  }
  // Handle form submission logic here
  console.log('Form submitted');
}

}

