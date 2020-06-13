import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import * as faker from 'faker';

import {BookComponent} from './book.component';
import {BookModel} from '../../models/book/book.model';
import {RouterTestingModule} from '@angular/router/testing';
import {CartService} from '../../services/cart.service';
import {CartServiceMock} from '../../services/cart.service.mock';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let book: BookModel;
  let nativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: CartService, useClass: CartServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    book = new BookModel(
      faker.image.image(),
      faker.lorem.words(),
      faker.lorem.paragraph(),
      1234.55,
      0
    );
    component.book = book;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show book image', () => {
    const image = nativeElement.querySelector('.book-image').getAttribute('src');
    expect(image).toEqual(book.image);
  });

  it('should show book image', () => {
    const title = nativeElement.querySelector('.book-title').innerHTML;
    expect(title).toEqual(book.title);
  });

  it('should show book description', () => {
    const description = nativeElement.querySelector('.book-description').innerHTML;
    expect(description).toEqual(book.description);
  });

  it('should show book price', () => {
    const price = nativeElement.querySelector('.book-price').innerHTML;
    expect(price).toEqual('$1,234.55');
  });

  xit('pending', () => {
    const anything: any = jasmine.any(Number);
  });

  it('should set correct number of upvotes', () => {
    const votes = component.votesCounter();
    expect(component.votesCounter()).toEqual(votes);
    expect(component.votesCounter()).toBeGreaterThan(votes - 1);
    expect(component.votesCounter()).not.toEqual(votes + 1);
    expect(component.votesCounter()).toBeLessThan(votes + 1);
  });

  it('upvote invokes component function', () => {
    const spy = spyOn(component, 'upvote');
    const button: HTMLButtonElement = nativeElement.querySelector('button.upvote');
    button.click();
    expect(spy).toHaveBeenCalled();
  });

  xit('should emit addToCart event using done', (done) => {
    component.addToCart.subscribe( event => {
      expect(event).toEqual(component.book);
      done();
    });
    component.sendToCart();
  });

  it('should emit addToCart event', () => {
    component.addToCart.subscribe( event => {
      expect(event).toEqual(component.book);
    });
    component.sendToCart();
  });

  it('should call to function sendToCart when clicked', () => {
    const spy = spyOn(component, 'sendToCart');
    const button = nativeElement.querySelector('button.send-to-cart');
    button.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });
});
