import { Injectable } from '@angular/core';
import { Product } from '../pages/products/interfaces/product';
import { CartItem } from '../pages/cart/interfaces/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems:CartItem[] = [];

  constructor() {}

  addProduct( productAdded: Product) {
    const existing = this.cartItems.find(({product}) => product.id === productAdded.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cartItems.push({ product: {...productAdded}, quantity: 1});
    }
  }

  getCart():CartItem[] {
    return this.cartItems;
  }

  removeProduct(productId: number) {
    this.cartItems = this.cartItems.filter(({product}) => product.id !== productId);
  }

  clearCart() {
    this.cartItems = [];
  }

  getTotal() {
    return this.cartItems.reduce((i, {product, quantity}) => i + product.price * quantity, 0);
  }
}
