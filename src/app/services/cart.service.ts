import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Subject} from 'rxjs';
import {BookModel} from '../models/book/book.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private emitAddToCart = new Subject<any>();
  addEmitted$ = this.emitAddToCart.asObservable();
  hardCodedUrl = 'https://angular-tdd-eduonix-1381.firebaseio.com/databases/(default)/documents/cart?key=AIzaSyB6OxX5VDOvXJxjvI5Ou_ULj6cOKMnXzas';

  constructor(private db: AngularFirestore,
              private http: HttpClient) { }

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

  httpCall() {
    return this.http.get(this.hardCodedUrl);
  }
}
