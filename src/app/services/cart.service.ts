import { Injectable, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit{
   cartItems: any[]=[];

  constructor(private apiService: ApiService, private global:GlobalService) {}



  ngOnInit(): void {
    const userId = this.global.userId; // Ensure this value is available
    if (userId) {
      alert("aman")
      // this.fetchCartItems(userId);
    }
  }
  // Fetch cart items from the backend for the logged-in user
   fetchCartItems(userId: string): void {
    console.log("fetchCartItems called with userId:", userId);
    this.apiService.getCart(userId).subscribe(
      (response) => {
        console.log("Cart items fetched:", response);
        this.cartItems = response.items;
      },
      error => {
        console.error('Error fetching cart items', error);
      }
    );
  }
  

  getCartItems(): any[] {
    return this.cartItems;
  }

  addItemToCart(item: any): void {
    const userId = sessionStorage.getItem('userId');
    const existingItem = this.cartItems.find(cartItem => cartItem.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }

    // Sync cart with backend
    this.apiService.addToCart(userId, this.cartItems).subscribe(
       () => console.log('Cart updated successfully'),
      error => console.error('Failed to update cart', error)
    );
  }

  removeItemFromCart(itemId: any): void {
    const userId = sessionStorage.getItem('userId');
    if (!userId) return;

    this.cartItems = this.cartItems.filter(item => item.productId !== itemId);

    // Sync removal with backend
    this.apiService.removeFromCart(userId, itemId).subscribe(
       () => console.log('Item removed successfully'),
      error=> console.error('Failed to remove item', error)
    );
  }

  updateQuantity(itemId: number, quantity: number): void {
    const userId = sessionStorage.getItem('userId');
    if (!userId) return;

    const item = this.cartItems.find(item => item.productId === itemId);
    if (item && quantity > 0) {
      item.quantity = quantity;

      // Sync cart update with backend
      this.apiService.updateCart(userId, this.cartItems).subscribe(
         () => console.log('Cart updated successfully'),
        error => console.error('Failed to update cart', error)
      );
    }
  }
  decreaseQuantity(itemId: number): void {
    const item = this.cartItems.find(cartItem => cartItem.productId === itemId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        this.removeItemFromCart(itemId);
      }
    }
  }
  getQuantity(itemId: number): number {
    const item = this.cartItems.find(cartItem => cartItem.productId === itemId);
    return item ? item.quantity : 0;
  }
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);
  }
}

 

