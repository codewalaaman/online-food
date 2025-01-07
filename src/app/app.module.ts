import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './comman/header/header.component';
import { FooterComponent } from './comman/footer/footer.component';
import { HomeComponent } from './client/home/home.component';
import { ReservationComponent } from './client/reservation/reservation.component';
import { ContactComponent } from './client/contact/contact.component';
import { MenuComponent } from './client/menu/menu.component';
import { CartComponent } from './client/cart/cart.component';
import { LoginComponent } from './client/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaymentComponent } from './client/payment/payment.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReservationdetailComponent } from './client/reservationdetail/reservationdetail.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ReservationComponent,
    ContactComponent,
    MenuComponent,
    CartComponent,
    LoginComponent,
    PaymentComponent,
    ReservationdetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    // NgModule,
    ToastrModule.forRoot({
      timeOut:5000,
      progressBar: true,
      closeButton: true // If we need close button
  }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
