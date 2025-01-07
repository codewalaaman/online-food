import { Injectable } from '@angular/core';

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


  constructor() { }

}
