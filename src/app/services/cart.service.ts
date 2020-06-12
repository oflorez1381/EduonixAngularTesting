import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Subject} from 'rxjs';
import {BookModel} from '../models/book/book.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private emitAddToCart = new Subject<any>();
  addEmitted$ = this.emitAddToCart.asObservable();

  constructor(private db: AngularFirestore) { }

  query() {
    // promise
    return this.db.collection('/cart').valueChanges();
  }

  add(data){
    const item = this.db.collection<BookModel>('/cart').add(data.getData());
    this.emitAddToCart.next(item);
    return item;
  }

  emitChange(book: BookModel){
    this.emitAddToCart.next(book);
  }
}
