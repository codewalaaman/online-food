import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  isLoggedIn:boolean=false;
  username:string="";
  userEmail:string="";
  reservations: any[] = [];
  userId:string="";
  adminLogin:boolean=false;
  bootstrap: any;
  isNavbarOpen = false;
  orderList: any[] = [];
  showorderHistory:boolean=false


  constructor( private apiService:ApiService) { }

  getOrderList(){

    this.apiService.getOrdersByUserId(this.userId).subscribe(
      data => {
        this.orderList = data.orders;
        // this.isLoading = false;
      },
      (error) => {
        console.error('Error confirming order:', error);
        // this.isLoading = false;
      }
    );
  
}

}
