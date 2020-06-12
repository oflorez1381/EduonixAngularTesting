import {Component} from '@angular/core';
import {BookModel} from './models/book/book.model';
import {CartService} from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EduonixAngularTesting';
  public cart: BookModel[] = [];
  public book: BookModel = new BookModel(
    'https://upload.wikimedia.org/wikipedia/commons/1/1d/Tom_Sawyer_1876_frontispiece.jpg',
    'Tom Sawyer',
    `Thomas "Tom" Sawyer is the title character of the Mark Twain novel The Adventures of Tom Sawyer`,
    15,
    0
  );

  constructor(private cartService: CartService) {
    this.cartService.query().subscribe((items: BookModel[]) => {
      this.cart = items;
    });

    this.cartService.addEmitted$.subscribe((item: BookModel) => {
      this.cart.push(item);
    });
  }

  addToCart(book: BookModel){
    this.cart.push(book);
  }
}
