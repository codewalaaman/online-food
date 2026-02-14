import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { FormService } from 'src/app/services/form.service';
import { GlobalService } from 'src/app/services/global.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { response } from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:any= FormGroup;
  signupForm:any= FormGroup;
  isSignupMode: boolean = false;
  isLoggedIn = new BehaviorSubject<boolean>(false); // Observable for login state
  private cartItems: any[]=[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public global: GlobalService,
    public formService: FormService,
    private apiService: ApiService ,// Inject ApiService
    private toastr: ToastrService,
    private cartService:CartService,
  ) { }

  ngOnInit(): void {
    this.global.isNavbarOpen = false;
    this.loginForm = this.formService.createLoginForm();
    this.signupForm = this.formService.createSignupForm();
    this.cartItems=this.cartService.cartItems;
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.apiService.getloginUser(email, password).subscribe((response) => {
        console.log(response);
          if (response._id) {
            this.global.adminLogin=response?.isAdmin;
            sessionStorage.setItem('userId', response._id);
            sessionStorage.setItem('admin',response.isAdmin);
            this.global.userId=response._id;
            // this.getUserReservations();
            this.toastr.success(response?.message);
            this.global.username=response?.username;
            this.global.userEmail=response?.email;
            this.isLoggedIn.next(true);
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('user', JSON.stringify(response));
            this.global.isLoggedIn = true; // Update global service state
            this.router.navigate(['home']);
            this.cartService.fetchCartItems(response._id);
            this.global.getOrderList()
            this.getUserReservations();

          } 
      }, error => {
        
        this.toastr.error(error?.error?.message);
        sessionStorage.setItem('isLoggedIn', 'false');
      });
    } else {
      alert("aman ")
      console.log('Login form is not valid');
    }
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      const username = this.signupForm.get('name')?.value;
      const email = this.signupForm.get('email')?.value;
      const password = this.signupForm.get('password')?.value;

      this.apiService.registerUser({ username, email, password}).subscribe({
        next: (response) => {
          console.log(response);

          if (response._id) {
            sessionStorage.setItem('userId', response._id);
            // this.getUserReservations()
            this.toastr.success(response?.message);
            this.global.username=response?.username;
            this.global.userEmail=response?.email;
            this.toastr.success(response?.message);
            // alert('Signup successful!');
            this.isSignupMode = false;
            this.router.navigate(['login']);
          } else {
            this.toastr.error(response?.message);

            alert('Signup failed.');
          }
        },
        error: (error) => {
          this.toastr.error(error?.error?.message)
          // console.error('Signup error:', error);
          // alert('An error occurred. Please try again.');
        }
      });
    } else {
      console.log('Signup form is not valid');
    }
  }

    getOrderList(){

        this.apiService.getOrdersByUserId(this.global.userId).subscribe(
          data => {
            this.global.orderList = data.orders;
            // this.isLoading = false;
          },
          (error) => {
            console.error('Error confirming order:', error);
            // this.isLoading = false;
          }
        );
      
    }
  getUserReservations(): void {
    const userId = sessionStorage.getItem('userId');

    if (userId) {
      this.apiService.getUserReservations(userId).subscribe({
        next: (response) => {
          this.global.reservations = response.reservations;
          // this.toastr.success('Reservations retrieved successfully');
        },
        error: (error) => {
          console.error('Error fetching reservations:', error);
          this.toastr.error('Failed to retrieve reservations.');
        }
      });
    } else {
      console.log('User not logged in.');
    }
  } 
  // fetchCartItems(userId: string): void {
  //   console.log("fetchCartItems called with userId:", userId);
  //   this.apiService.getCart(userId).subscribe(
  //     (response) => {
  //       console.log("Cart items fetched:", response?.items);
  //       this.cartItems = response.items;
  //     },
  //     error => {
  //       console.error('Error fetching cart items', error);
  //     }
  //   );
  // }

  toggleForm(): void {
    this.isSignupMode = !this.isSignupMode;
  }
}
