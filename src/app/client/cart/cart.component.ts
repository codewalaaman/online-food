import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService, private router: Router, private global:GlobalService) {}

  ngOnInit(): void {
    // this.cartService.fetchCartItems(this.global.userId)
    this.global.isNavbarOpen = false;
    this.cartItems = this.cartService.cartItems;
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  removeItem(itemId: any): void {
    debugger
    this.cartService.removeItemFromCart(itemId);
    this.cartItems = this.cartService.getCartItems();
  }

  updateQuantity(itemId: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement | null;
    
    if (inputElement && inputElement.value) {
      const quantity = Number(inputElement.value);
      if (quantity > 0) {
        this.cartService.updateQuantity(itemId, quantity);
      } else {
        // Remove the item if quantity is zero or less
        this.removeItem(itemId);
      }      this.cartItems = this.cartService.getCartItems();
    }
  }

  proceedToCheckout(): void {
    const totalAmount = this.getTotalPrice();
    const items = this.cartItems.map(item => ({
      productName: item.productName,
      productPrice: item.productPrice,
      quantity: item.quantity,
      productImageUrl: item.productImageUrl // Include image URL
    }));

    this.router.navigate(['/payment'], { queryParams: { totalAmount, items: JSON.stringify(items) } });
  }
  getQuantity(itemId: number): number {
    return this.cartService.getQuantity(itemId);
  }
  // orderItem(item: { id: number, name: string, price: number, imageUrl: string }) {
  //   this.cartService.addItemToCart({ ...item, quantity: 1 });
  // }
  increaseQuantity(item: any): void {
    this.cartService.addItemToCart({ ...item, quantity: 1 });
    this.cartItems = this.cartService.getCartItems(); // Refresh cart items after adding

  }

  decreaseQuantity(itemId: number): void {
    this.cartService.decreaseQuantity(itemId);
    this.cartItems = this.cartService.getCartItems(); // Refresh cart items after adding

  }
}
