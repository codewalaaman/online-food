import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { FormService } from 'src/app/services/form.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
interface Restaurant {
  name: string;
  location: string;
  city: string;
  price: string;
  rating: string;
  image: string;
  offers: string;
  dineoutPay: boolean;
  pureVeg: boolean;
  fiveStar: boolean;
  buffet: boolean;
  description: string;
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  encapsulation: ViewEncapsulation.Emulated, // Default setting

})
export class ReservationComponent implements OnInit {
  reservationForm:any= FormGroup;

  restaurants: Restaurant[] = [
    {
      name: 'Ce La Vie Kitchen & Bar',
      location: 'Connaught Place, Central Delhi',
      city: 'Delhi',
      price: '₹1,800',
      rating: '4.0',
      image: 'assets/restaurant1.webp',
      offers: '10% Off',
      dineoutPay: true,
      pureVeg: false,
      fiveStar: true,
      buffet: false,
      description: 'Continental, Asian, North Indian cuisine in a premium setting.'
    },
    {
      name: 'Barbeque Nation',
      location: 'Khan Market, South Delhi',
      city: 'Delhi',
      price: '₹2,000',
      rating: '4.5',
      image: 'assets/restaurant2.webp',
      offers: 'Buffet available',
      dineoutPay: true,
      pureVeg: false,
      fiveStar: false,
      buffet: true,
      description: 'Famous for buffet dining and grilled dishes.'
    },
    {
      name: 'Pizza Hut',
      location: 'Powai, Mumbai',
      city: 'Mumbai',
      price: '₹800',
      rating: '4.1',
      image: 'assets/restaurant3.webp',
      offers: 'Flat 20% Off',
      dineoutPay: true,
      pureVeg: false,
      fiveStar: false,
      buffet: false,
      description: 'Popular pizza chain offering delicious Italian food.'
    },
    {
      name: 'Toscano',
      location: 'Indiranagar, Bangalore',
      city: 'Bangalore',
      price: '₹1,500',
      rating: '4.4',
      image: 'assets/restaurant4.webp',
      offers: '15% off on weekdays',
      dineoutPay: false,
      pureVeg: false,
      fiveStar: false,
      buffet: false,
      description: 'Modern Italian restaurant serving pizzas, pastas, and gourmet dishes.'
    },
    {
      name: 'Haldiram’s',
      location: 'Chandni Chowk, Delhi',
      city: 'Delhi',
      price: '₹600',
      rating: '4.2',
      image: 'assets/restaurant5.webp',
      offers: '10% cashback with Dineout Pay',
      dineoutPay: true,
      pureVeg: true,
      fiveStar: false,
      buffet: false,
      description: 'Famous for authentic Indian street food and sweets.'
    },
    {
      name: 'The Great Kebab Factory',
      location: 'Vasant Kunj, South Delhi',
      city: 'Delhi',
      price: '₹2,500',
      rating: '4.6',
      image: 'assets/restaurant6.webp',
      offers: 'Unlimited Kebabs at ₹999',
      dineoutPay: true,
      pureVeg: false,
      fiveStar: true,
      buffet: false,
      description: 'Luxurious restaurant serving a variety of mouth-watering kebabs.'
    },
    {
      name: 'Smoke House Deli',
      location: 'Bandra West, Mumbai',
      city: 'Mumbai',
      price: '₹2,000',
      rating: '4.3',
      image: 'assets/restaurant7.webp',
      offers: '10% Off on Sundays',
      dineoutPay: false,
      pureVeg: false,
      fiveStar: false,
      buffet: false,
      description: 'A trendy spot offering European dishes with a creative twist.'
    },
    {
      name: 'Oh! Calcutta',
      location: 'Koramangala, Bangalore',
      city: 'Bangalore',
      price: '₹1,700',
      rating: '4.7',
      image: 'assets/restaurant8.jpg',
      offers: 'Bengali Thali ₹499',
      dineoutPay: true,
      pureVeg: false,
      fiveStar: false,
      buffet: true,
      description: 'Authentic Bengali cuisine with signature dishes like fish and mustard curry.'
    },
    {
      name: 'Sagar Ratna',
      location: 'Dadar, Mumbai',
      city: 'Mumbai',
      price: '₹1,000',
      rating: '4.1',
      image: 'assets/restaurant9.jpg',
      offers: 'Free Dessert with Main Course',
      dineoutPay: true,
      pureVeg: true,
      fiveStar: false,
      buffet: false,
      description: 'Known for its delicious South Indian vegetarian meals.'
    },
    {
      name: 'Le Cirque',
      location: 'The Leela Palace, Bangalore',
      city: 'Bangalore',
      price: '₹4,500',
      rating: '4.9',
      image: 'assets/restaurant10.jpg',
      offers: 'Exclusive French wine pairing',
      dineoutPay: false,
      pureVeg: false,
      fiveStar: true,
      buffet: false,
      description: 'Fine dining with exquisite French and Italian cuisine.'
    }
  ];
  
  filterOptions = {
    dineoutPay: false,
    pureVeg: false,
    fiveStar: false,
    buffet: false
  };

  searchQuery = '';
  selectedCity = '';

  filteredRestaurants: Restaurant[] = [];

  constructor(
    private router: Router,
    public global: GlobalService,
    public formService: FormService,
    private apiService:ApiService,
    private toastr :ToastrService
  ) { }

  ngOnInit() {
    this.global.isNavbarOpen = false;
    this.filteredRestaurants = this.restaurants; // Initially show all restaurants
    this.reservationForm = this.formService.createReservationForm();
  }

  reservationFormSubmit(): void {
    if (this.reservationForm.valid) {
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
    } else {
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
  filterRestaurants() {
    this.filteredRestaurants = this.restaurants.filter(restaurant => {
      const matchesCity = this.selectedCity ? restaurant.city === this.selectedCity : true;
      const matchesSearch = restaurant.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            restaurant.offers.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            restaurant.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesDineoutPay = this.filterOptions.dineoutPay ? restaurant.dineoutPay : true;
      const matchesPureVeg = this.filterOptions.pureVeg ? restaurant.pureVeg : true;
      const matchesFiveStar = this.filterOptions.fiveStar ? restaurant.fiveStar : true;
      const matchesBuffet = this.filterOptions.buffet ? restaurant.buffet : true;

      return matchesCity && matchesSearch && matchesDineoutPay && matchesPureVeg && matchesFiveStar && matchesBuffet;
    });
  }
  onImageClick(restaurant:any) {
    console.log("restaurant",restaurant)
    this.router.navigate(['/reservationdetail'], { queryParams: { restdetail:JSON.stringify(restaurant) } });
  }
}



      // Optionally, call an API to submit the form data
      // this.apiService.submitReservation(this.reservationForm.value).subscribe(
      //   response => {
      //     console.log('Reservation successful:', response);
      //     // Navigate to a confirmation page or show a success message
      //     this.router.navigate(['/confirmation']);  // Example route
      //   },
      //   error => {
      //     console.error('Reservation failed:', error);
      //     // Handle error
      //   }
      // );
   
