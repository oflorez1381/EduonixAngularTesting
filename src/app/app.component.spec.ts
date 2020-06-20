import {async, fakeAsync, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {BookComponent} from './components/book/book.component';
import {CartList, CartServiceMock} from './services/cart.service.mock';
import {CartService} from './services/cart.service';
import {DiscountFormatterPipe} from './pipes/discount-formatter/discount-formatter.pipe';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        BookComponent,
        DiscountFormatterPipe
      ],
      providers: [
        { provide: CartService, useClass: CartServiceMock }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'EduonixAngularTesting'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('EduonixAngularTesting');
  });

  it('should display the cart after rendering',
    fakeAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      expect(fixture.componentInstance.cart).toBe(CartList);
    })
  );
});
