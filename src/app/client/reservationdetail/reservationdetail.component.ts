import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';
import { FormService } from 'src/app/services/form.service';






@Component({
  selector: 'app-reservationdetail',
  templateUrl: './reservationdetail.component.html',
  styleUrls: ['./reservationdetail.component.css']
})
export class ReservationdetailComponent implements OnInit {
  restaurant: any | null = null;
  reservationForm:any= FormGroup;
  constructor(private route: ActivatedRoute,private router: Router, public global: GlobalService,
    public formService: FormService,
    private apiService:ApiService,
    private toastr :ToastrService
    ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Parse the restaurant object from the query parameter
      this.restaurant = JSON.parse(params['restdetail']);
      console.log("Received restaurant details:", this.restaurant);
    });
    this.reservationForm = this.formService.createReservationForm();
  }
  goBack() {
    this.router.navigate(['/reservation']); // Adjust the route as needed
  }
  reservationFormSubmit() {
    if (this.reservationForm.valid ) {
      if(this.global.isLoggedIn){
        const datetime = this.reservationForm.get('datetime')?.value;
      const reservationId = this.generateReservationId();
      // Split date and time
      const date = new Date(datetime).toISOString().split('T')[0]; // Extract date
      const time = new Date(datetime).toTimeString().split(' ')[0]; // Extract time (hh:mm:ss format)
  
      // Prepare the reservation data to be sent
      const reservationData = {
        userId:this.global.userId,
        fullName: this.reservationForm.get('name')?.value,
        reservationEmail: this.reservationForm.get('email')?.value,
        reservationPhone: this.reservationForm.get('phone')?.value,
        reservationDate: date,   // Sending the extracted date
        reservationTime: time,   // Sending the extracted time
        guests: this.reservationForm.get('guests')?.value,
        specialRequests: this.reservationForm.get('specialRequests')?.value,        
      };
      console.log(reservationData);
  
      this.apiService.addReservation(reservationData).subscribe((response) => {
          console.log(response)
          this.toastr.success('Reservation successful!');
          this.reservationForm.reset();
        },
        error => {
          console.error('Error:', error);
          this.toastr.error('Failed to make a reservation.');
        
      });
      }
      else{
        this.router.navigate(['/login']);

      }
      
    } else {
      alert("")
      this.toastr.warning('Please fill all required fields.');
    }
  }
  generateReservationId(): string {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  }
  

  redirectToPayment(): void {
    // Implement redirection logic here
    this.router.navigate(['/payment']);
  }
}
