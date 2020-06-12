import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookModel} from '../../models/book/book.model';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() book: BookModel;
  @Output() addToCart: EventEmitter<BookModel> = new EventEmitter<BookModel>();

  constructor(private route: ActivatedRoute, private cartService: CartService) {
    route.params.subscribe(res => {
      this.book = BookModel.find(res.title);
    });
  }

  ngOnInit(): void {
  }

  votesCounter() {
    return this.book.upvotes;
  }
  upvote(){
    return this.book.upvotes++;
  }

  sendToCart(){
    this.addToCart.emit(this.book);
    this.cartService.add(this.book);
  }

}
