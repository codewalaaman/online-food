import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './client/home/home.component';
import { ContactComponent } from './client/contact/contact.component';
import { ReservationComponent } from './client/reservation/reservation.component';
import { MenuComponent } from './client/menu/menu.component';
import { CartComponent } from './client/cart/cart.component';
import { LoginComponent } from './client/login/login.component';
import { AuthGuard } from './auth.guard';
import { PaymentComponent } from './client/payment/payment.component';
import { ReservationdetailComponent } from './client/reservationdetail/reservationdetail.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
     { path:'contact',component:ContactComponent},
     { path:'reservation',component:ReservationComponent},
     { path:'menu',component:MenuComponent},
     { path:'cart',component:CartComponent,canActivate:[AuthGuard]},
     { path:'login',component:LoginComponent},
     { path:'payment', component:PaymentComponent,canActivate:[AuthGuard]},
     { path:'reservationdetail', component:ReservationdetailComponent},
   
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
