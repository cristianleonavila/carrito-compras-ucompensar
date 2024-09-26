import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from './interfaces/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {

  cart:CartItem[] = [];

  constructor(private cartService: CartService) {
    this.cart = this.cartService.getCart();
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  removeProduct(productId:number) {
    this.cartService.removeProduct(productId);
    this.cart = this.cartService.getCart();
  }
}
