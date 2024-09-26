import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from './interfaces/product';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage {
  products = [
    { id: 1, name: 'Producto 1', price: 10.00 },
    { id: 2, name: 'Producto 2', price: 20.00 },
    { id: 3, name: 'Producto 3', price: 75.00 },
  ];

  public cartItems: number = 0;

  constructor(private cartService: CartService, private alert: AlertController ) {}

  addToCart(product: Product) {
    this.cartService.addProduct(product);
    this.cartItems = this.cartService.getCart().length;
    this.productAdded();
  }

  productAdded() {
    this.alert.create({
      header: "¡Hecho!",
      message: "Producto agregado correctamente",
      buttons: [
        {text: "Ok", role:'cancel' }
      ]
    }).then(el => el.present());
  }
}
