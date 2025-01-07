import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  addNewProductForm:any=FormGroup;
  editProductForm:any=FormGroup;
selectedImage: File | null = null;
selectedProduct: any = null;  // To hold the selected product for editing
foodItems: any[] = [];
filteredItems: any[] = [];
openDropdowns: Set<number> = new Set<number>();
menuQuery: string = '';



  // foodItems = [
  //   { id: 1, name: 'Paneer Makhani', description: 'Delicious Paneer Makhani cooked with a rich, creamy tomato sauce and fresh vegetables.', price: 1099, type: 'veg', imageUrl: 'assets/paneer-makhani.jpeg' },  // Price in rupees
  //   { id: 2, name: 'Chicken Fried Rice', description: 'Flavorful fried rice stir-fried with tender pieces of chicken, vegetables, and a savory sauce.', price: 1299, type: 'non-veg', imageUrl: 'assets/Chickenfriedrice.jpeg' },
  //   { id: 3, name: 'Chettinad Chicken Curry', description: 'Spicy and aromatic Chettinad Chicken Curry with a blend of traditional South Indian spices and tender chicken pieces.', price: 1299, type: 'non-veg', imageUrl: 'assets/Chettinadcurry.jpeg' },
  //   { id: 4, name: 'Chicken Hyderabadi Biryani', description: 'Fragrant Hyderabadi Biryani with succulent chicken, basmati rice, and a rich blend of spices.', price: 1299, type: 'non-veg', imageUrl: 'assets/chickenhyderabadibiryani.jpeg' },
  //   { id: 5, name: 'Chicken Tandoori', description: 'Juicy chicken marinated in a mix of yogurt and spices, then grilled to perfection.', price: 1299, type: 'non-veg', imageUrl: 'assets/chickentandoori.jpeg' },
  //   { id: 6, name: 'Chicken Kadai', description: 'Spicy Chicken Kadai cooked with bell peppers, tomatoes, and a special blend of Indian spices.', price: 1299, type: 'non-veg', imageUrl: 'assets/chickenkadai.jpeg' },
  //   { id: 7, name: 'Egg Fried Rice', description: 'Stir-fried rice with scrambled eggs, vegetables, and a touch of soy sauce for a satisfying meal.', price: 1299, type: 'non-veg', imageUrl: 'assets/eggfriedrice.jpeg' },
  //   { id: 8, name: 'Fish Fry', description: 'Crispy and golden-brown fried fish fillets seasoned with a blend of spices and herbs.', price: 1299, type: 'non-veg', imageUrl: 'assets/fishfry.jpeg' },
  //   { id: 9, name: 'Chicken Lucknowi Biryani', description: 'Aromatic Lucknowi Biryani with tender chicken, saffron-infused basmati rice, and a rich blend of spices.', price: 1299, type: 'non-veg', imageUrl: 'assets/Lucknowibiryani.webp' },
  //   { id: 10, name: 'Korean Fried Chicken', description: 'Crispy Korean Fried Chicken with a sweet and spicy glaze, offering a deliciously unique flavor experience.', price: 1299, type: 'non-veg', imageUrl: 'assets/KoreanFriedChicken.jpeg' }
  // ];
  

  // filteredItems = this.foodItems;
  constructor(private cartService: CartService, public global:GlobalService ,private formService:FormService , private apiService:ApiService , private route:ActivatedRoute) {}
  
  ngOnInit(): void {
    this.global.isNavbarOpen = false;
    this.addNewProductForm = this.formService.addNewProduct();
    this.editProductForm=this.formService.editProductForm();
    this.fetchProducts();
     this.route.queryParams.subscribe(params => {
      this.menuQuery = params['search'] || '';
      this.filterMenuItems();
    });

  }
  fetchProducts() {
    this.apiService.getProducts().subscribe(
      (products) => {
        console.log("products",products)
        this.foodItems = products;
        console.log("food items",this.foodItems)     
         this.filteredItems = [...this.foodItems];
      },
      (error) => console.error('Error fetching products', error)
    );
  }

  filterItems(type: string) {
    if (type === 'all') {
      this.filteredItems = this.foodItems;
    } else {
      this.filteredItems = this.foodItems.filter(item => item.productType === type);
    }
  }
  addToCart(item: any) {
    // Add item with a default quantity of 1 when adding to the cart
    
    this.cartService.addItemToCart({ ...item, quantity: 1 });
  }
  getQuantity(itemId: number): number {
    return this.cartService.getQuantity(itemId);
  }
  // orderItem(item: { id: number, name: string, price: number, imageUrl: string }) {
  //   this.cartService.addItemToCart({ ...item, quantity: 1 });
  // }
  increaseQuantity(item: any): void {
    this.cartService.addItemToCart({ ...item, quantity: 1 });
  }

  decreaseQuantity(itemId: number): void {
    this.cartService.decreaseQuantity(itemId);
  }
  onImageChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
    }
  }
  addNewProduct() {
    debugger
    if (this.addNewProductForm.valid && this.selectedImage) {
      const formData = new FormData();
      formData.append('productId', this.addNewProductForm.get('productId')?.value);
      formData.append('productName', this.addNewProductForm.get('productName')?.value);
      formData.append('productPrice', this.addNewProductForm.get('productPrice')?.value);
      formData.append('productDescription', this.addNewProductForm.get('productDescription')?.value);
      formData.append('productType', this.addNewProductForm.get('productType')?.value);
      formData.append('productImage', this.selectedImage);

      this.apiService.createProduct(formData).subscribe(
        (response) => {
          console.log('Product created successfully', response);
          this.fetchProducts(); // Refresh the list
          this.addNewProductForm.reset();
          this.selectedImage = null;
        },
        (error) => console.error('Error creating product', error)
      );
    }
  }
  openEditModal(product: any): void {
    this.selectedProduct = product;
    this.editProductForm.patchValue(product);  // Load product data into the form
  }

  updateProduct(): void {
    if (this.editProductForm.valid) {
      this.apiService.updateProduct(this.selectedProduct.id, this.editProductForm.value).subscribe(
        response => {
          console.log('Product updated successfully', response);
          this.fetchProducts();  // Refresh the product list
        },
        error => {
          console.error('Error updating product', error);
        }
      );
    }
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.apiService.deleteProduct(id).subscribe(
        response => {
          console.log('Product deleted successfully', response);
          this.fetchProducts();  // Refresh the product list
        },
        error => {
          console.error('Error deleting product', error);
        }
      );
    }
  }
  toggleDropdown(itemId: number) {
    console.log('Toggling dropdown for itemId:', itemId);
    if (this.openDropdowns.has(itemId)) {
      this.openDropdowns.delete(itemId);
    } else {
      this.openDropdowns.add(itemId);
    }
    console.log('Current openDropdowns:', Array.from(this.openDropdowns));
  }
  
  isDropdownOpen(itemId: number): boolean {
    console.log('Checking if dropdown is open for itemId:', itemId);
    console.log("checking true or false",this.openDropdowns.has(itemId))
    return this.openDropdowns.has(itemId);
  }
  
  applyFilter(filter: string): void {
    switch (filter) {
      case 'fastDelivery':
        this.filteredItems = this.foodItems.filter(item => item.fastDelivery);
        break;
      case 'newOnSwiggy':
        // Assuming you add a "newOnSwiggy" property
        this.filteredItems = this.foodItems.filter(item => item.newOnSwiggy);
        break;
      case 'ratings':
        this.filteredItems = this.foodItems.filter(item => item.ratings >= 4.0);
        break;
      case 'pureVeg':
        this.filteredItems = this.foodItems.filter(item => item.productType.veg);
        break;
      case 'offers':
        this.filteredItems = this.foodItems.filter(item => item.offers);
        break;
      case '300to600':
        this.filteredItems = this.foodItems.filter(item => item.productPrice >= 300 && item.productPrice <= 600);
        break;
      case 'lessThan300':
        this.filteredItems = this.foodItems.filter(item => item.productPrice < 300);
        break;
      default:
        this.filteredItems = [...this.foodItems];
    }
  }
  applySort(sortBy: string): void {
    switch (sortBy) {
      case 'relevance':
        // Implement default sorting or relevance logic
        this.filteredItems = [...this.foodItems];
        break;
      case 'deliveryTime':
        // Implement sorting based on delivery time
        this.filteredItems = [...this.foodItems].sort((a, b) => a.deliveryTime - b.deliveryTime);
        break;
      case 'rating':
        // Implement sorting based on rating
        this.filteredItems = [...this.foodItems].sort((a, b) => b.rating - a.rating);
        break;
      case 'costLowToHigh':
        // Implement sorting based on cost from low to high
        this.filteredItems = [...this.foodItems].sort((a, b) => a.price - b.price);
        break;
      case 'costHighToLow':
        // Implement sorting based on cost from high to low
        this.filteredItems = [...this.foodItems].sort((a, b) => b.price - a.price);
        break;
      default:
        this.filteredItems = [...this.foodItems];
    }
  }
  filterMenuItems(): void {
    if (this.menuQuery) {
      this.filteredItems = this.foodItems.filter(item =>
        item.productName.toLowerCase().includes(this.menuQuery.toLowerCase())
      );
    } else {
      this.filteredItems = this.foodItems; // Show all items if search query is empty
    }
  }

  
}

