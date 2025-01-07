import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { FormBuilder } from '@angular/forms';
import { Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  searchQuery: string = '';

  constructor(private fb:FormBuilder, private router:Router, public global :GlobalService){

  }
 ngOnInit():void{
}

onLogout(): void {
  sessionStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('username');
  this.global.isLoggedIn = false;
  this.global.username = '';
  this.router.navigate(['/login']);
}
toggleNavbar() {
  this.global.isNavbarOpen = !this.global.isNavbarOpen;
}
onSearch(): void {
  if (this.searchQuery.trim()) {
    this.router.navigate(['/home'], { queryParams: { search: this.searchQuery } });
  }
}
showorderHistory(){
  this.global.showorderHistory=!this.global.showorderHistory;
}


}
