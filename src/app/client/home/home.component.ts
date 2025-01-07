import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit{
  searchQuery: string = '';
  menuQuery: string = '';
  filteredMenuItems: any[] = [];
  products = [
    {
      productName: 'Product 1',
      productId: 10,
      description: 'Description for Product 1',
      productPrice: 29.99,
      discount: 0,
      rating: 4,
      productImageUrl: 'assets/frontpagemenu/biryani.png'
    },
    {
      productName: 'Product 2',
      productId: 11,
      description: 'Description for Product 2',
      productPrice: 49.99,
      discount: 15,
      rating: 5,
      productImageUrl: 'assets/frontpagemenu/biryani.png'
    },
    {
      productName: 'Product 3',
      productId: 12,
      description: 'Description for Product 3',
      productPrice: 19.99,
      discount: 5,
      rating: 3,
      productImageUrl:'assets/frontpagemenu/biryani.png'
    },
    {
      productName: 'Product 4',
      productId: 13,
      description: 'Description for Product 4',
      productPrice: 39.99,
      discount: 20,
      rating: 4,
      productImageUrl:'assets/frontpagemenu/biryani.png'
    },
    {
      productName: 'Product 1',
      productId: 14,
      description: 'Description for Product 1',
      productPrice: 29.99,
      discount: 0,
      rating: 4,
      productImageUrl: 'assets/frontpagemenu/biryani.png'
    },
    {
      productName: 'Product 2',
      productId: 15,
      description: 'Description for Product 2',
      productPrice: 49.99,
      discount: 15,
      rating: 5,
      productImageUrl: 'assets/frontpagemenu/biryani.png'
    },
    {
      productName: 'Product 3',
      productId: 16,
      description: 'Description for Product 3',
      productPrice: 19.99,
      discount: 5,
      rating: 3,
      productImageUrl:'assets/frontpagemenu/biryani.png'
    },
    {
      productName: 'Product 4',
      productId: 17,
      description: 'Description for Product 4',
      productPrice: 39.99,
      discount: 20,
      rating: 4,
      productImageUrl:'assets/frontpagemenu/biryani.png'
    },
    {
      productName: 'Product 1',
      productId: 18,
      description: 'Description for Product 1',
      productPrice: 29.99,
      discount: 0,
      rating: 4,
      productImageUrl: 'assets/frontpagemenu/biryani.png'
    },
    {
      productName: 'Product 2',
      productId:19,
      description: 'Description for Product 2',
      productPrice: 49.99,
      discount: 15,
      rating: 5,
      productImageUrl: 'assets/frontpagemenu/biryani.png'
    },
    {
      productName: 'Product 3',
      productId:20,
      description: 'Description for Product 3',
      productPrice: 19.99,
      discount: 5,
      rating: 3,
      productImageUrl:'assets/frontpagemenu/biryani.png'
    },
    {
      productName: 'Product 4',
      productId:20,
      description: 'Description for Product 4',
      productPrice: 39.99,
      discount: 20,
      rating: 4,
      productImageUrl:'assets/frontpagemenu/biryani.png'
    }
  ];

  menuItems = [
    { image: 'assets/frontpagemenu/biryani.png' , name:"Biryani"},
    { image: 'assets/frontpagemenu/burger.png' , name:"Burger"},
    { image: 'assets/frontpagemenu/cake.png' , name:"Cake"},
    { image: 'assets/frontpagemenu/chinese.png' , name:"Chinese"},
    { image: 'assets/frontpagemenu/icecream.png' , name:"Ice-Cream"},
    { image: 'assets/frontpagemenu/kebab.png' , name:"Kebab"},
    { image: 'assets/frontpagemenu/momo.png' , name:"Momos"},
    { image: 'assets/frontpagemenu/northindian.png' , name:"North Indian"},
    { image: 'assets/frontpagemenu/paratha.png' , name:"Paratha"},
    { image: 'assets/frontpagemenu/pasta.png' , name:"Pasta"},
    { image: 'assets/frontpagemenu/pastry.png' , name:"Pastry"},
    { image: 'assets/frontpagemenu/pizza.png' , name:"Pizza"},
    { image: 'assets/frontpagemenu/rolls.png' , name:"Rolls"},
    { image: 'assets/frontpagemenu/salad.webp' , name:"Salads"},
    { image: 'assets/frontpagemenu/samosa.png' , name:"Samosa"},
    { image: 'assets/frontpagemenu/shawarma.png' , name:"Shawarma"},
    { image: 'assets/frontpagemenu/southindian.png' , name:"South Indian"},
    { image: 'assets/frontpagemenu/vegthali.png' , name:"Pure Veg"},
    // Add more menu items as necessary
  ];
  foodItems = [
    {
      productId: 10,
      productName: 'Veg thali',
      productDescription: 'Delicious description of food item 1.',
      productPrice: 1299, // Price in rupees      description: 'Delicious description of food item 1.',
      productImageUrl: 'assets/bigthali.jpeg',
      alt: 'Food Item 1'
    },
    {
      productId: 12,
      productName: 'Burger',
      productPrice: 1299, // Price in rupees
      productDescription: 'Delicious description of food item 2.',
      productImageUrl: 'assets/burger.jpeg',
      alt: 'Food Item 2'
    },
    {
      productId: 13,
      productName: 'Paneer',
      productDescription: 'Delicious description of food item 3.',
      productPrice: 1099,
      productImageUrl: 'assets/paneer-makhani.jpeg',
      alt: 'Food Item 3'
    },
    {
      productId: 14,
      productName: 'Food Item 4',
      productDescription: 'Delicious description of food item 4.',
      productPrice: 129, // Price in rupees      description: 'Delicious description of food item 1.',
      productImageUrl: 'assets/Chettinadcurry.jpeg',
      alt: 'Food Item 1'
    },
    {
      productId: 15,
      productName: 'Food Item 5',
      productDescription: 'Delicious description of food item 5.',
      productPrice: 199, // Price in rupees      description: 'Delicious description of food item 1.',
      productImageUrl: 'assets/parathatype.avif',
      alt: 'Food Item 1'
    },
    {
      productId: 16,
      productName: 'Chicken 65',
      productDescription: 'Delicious description of food item 6.',
      productPrice: 199, // Price in rupees      description: 'Delicious description of food item 1.',
      productImageUrl: 'assets/chicken65.jpg',
      alt: 'Food Item 1'
    },
    {
      productId: 17,
      productName: 'Chicken Biryani',
      productDescription: 'Delicious description of food item 7.',
      productPrice: 399, // Price in rupees      description: 'Delicious description of food item 1.',
      productImageUrl: 'assets/chickenhyderabadibiryani.jpeg',
      alt: 'Food Item 1'
    },
    
  ];
  constructor(private router: Router ,
              private cartService:CartService ,
              private toastr:ToastrService,
              private apiService:ApiService,
              private global:GlobalService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      if(this.searchQuery){
        this.products.filter(element => {
          if(element.productName.toLowerCase().includes(this.searchQuery)){ 
            this.products = [element]
          }
        })
      } else {
        
      }
    });

    console.log("home page");
    this.global.isNavbarOpen=false;    // this.toastr.error("home page")
  }
  logout(): void {
    sessionStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
 
  // filterMenuItems(): void {
  //   if (this.searchQuery) {
  //     this.filteredMenuItems = this.foodItems.filter(item =>
  //       item.productName.toLowerCase().includes(this.searchQuery.toLowerCase())
  //     );
  //   } else {
  //     this.filteredMenuItems = this.foodItems; // Show all items if search query is empty
  //   }
  // }
  getQuantity(itemId: number): number {
    return this.cartService.getQuantity(itemId);
  }
  orderItem(product:any) {
    this.cartService.addItemToCart({ ...product, quantity: 1 });
    // this.router.navigate(['/cart']);
  }
  increaseQuantity(item: any): void {
    this.cartService.addItemToCart({ ...item, quantity: 1 });
  }

  decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
    
  }
  scrollLeft() {
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
      menuContainer.scrollBy({
        left: -200,  // Scroll left by 200px
        behavior: 'smooth'
      });
    }
  }
  
  scrollRight() {
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
      menuContainer.scrollBy({
        left: 200,   // Scroll right by 200px
        behavior: 'smooth'
      });
    }
  }
  
  // getUserReservations(): void {
  //   const userId = sessionStorage.getItem('userId');

  //   if (userId) {
  //     this.apiService.getUserReservations(userId).subscribe({
  //       next: (response) => {
  //         this.global.reservations = response.reservations;
  //         // this.toastr.success('Reservations retrieved successfully');
  //       },
  //       error: (error) => {
  //         console.error('Error fetching reservations:', error);
  //         this.toastr.error('Failed to retrieve reservations.');
  //       }
  //     });
  //   } else {
  //     console.log('User not logged in.');
  //   }
  // }
  menuSearch(name:any): void {
    debugger
    if (name.trim()) {
      this.router.navigate(['/menu'], { queryParams: {search:name} });
    }
  }
  
}
