import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit{
  private apiUrl = 'http://localhost:5000/api';
  // private reserveApiUrl='http://localhost:5000/api/reservations';


  // private apiUrl = ''; // Replace with your API base URL

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    
  }

  // Method to log in a user
  getloginUser(email: string, password: string): Observable<any> {
    // Assuming your API endpoint for login is `/login`
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password });
  }

  registerUser(userData: { username: string; email: string; password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }
  addReservation(reservationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservations/add`, reservationData);
  }

  // Get all reservations
  getReservations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservations`);
  }

  // Get reservation by ID
  getUserReservations(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reservations/user/${userId}`);
  }

  // Update reservation
  updateReservation(id: string, reservationData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/reservations/${id}`, reservationData);
  }

  // Delete reservation
  deleteReservation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reservations/${id}`);
  }
  // Method to submit a reservation
  // submitReservation(data: any): Observable<any> {
  //   // Assuming your API endpoint for reservation submission is `/reservations`
  //   return this.http.post<any>(`${this.apiUrl}/reservations`, data);
  // }
  getCart(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cart/${userId}`);
  }

  // Add items to cart
  addToCart(userId: any, cartItems: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cart/${userId}/add`, { cartItems });
  }

  // Remove an item from cart
  removeFromCart(userId: string, itemId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cart/${userId}/items/${itemId}`);
  }

  // Update the entire cart
  updateCart(userId: string, cartItems: any[]): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cart/${userId}/update`, { cartItems });
  }
  // Product API calls
  createProduct(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/products`, formData);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${id}`);
  }

  updateProduct(id: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/products/${id}`, formData);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/products/${id}`);
  }
  confirmOrder(orderData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/order/confirm`, orderData);
  }

  clearCart(): Observable<any> {
    const userId = 'currentUserId'; // Replace with the actual user ID
    return this.http.delete<any>(`${this.apiUrl}/cart/${userId}`);
  }
  getOrdersByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/order/${userId}`);
  }
  getOrderById(orderId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/order/${orderId}`);
  }
  
}
