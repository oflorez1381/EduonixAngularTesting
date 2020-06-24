import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {CartServiceMock} from './services/cart.service.mock';
import {CartService} from './services/cart.service';
import {DiscountFormatterPipe} from './pipes/discount-formatter/discount-formatter.pipe';
import {environment} from '../environments/environment';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-book',
  template: '<div>book</div>'
})
class BookComponent {}

@Component({
  selector: 'app-book-edit',
  template: '<div>book edit</div>'
})
class BookEditComponent {}

@Component({
  selector: 'app-book-list',
  template: '<div>book list</div>'
})
class BookListComponent {}

describe('Routing', () => {
  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    // const routerStub: any = {
    //   navigate() {},
    //   routerState: {}
    // };
    //
    // spyOn(routerStub, 'navigate');

    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [
        AppComponent,
        BookComponent,
        BookEditComponent,
        BookListComponent,
        DiscountFormatterPipe
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'books/:title', component: BookComponent },
          { path: 'books/:title/edit', component: BookEditComponent },
          { path: 'books', component: BookListComponent },
          { path: 'books/new', component: BookEditComponent },
        ])
      ],
      providers: [
        { provide: CartService, useClass: CartServiceMock },
        { provide: environment, useValue: {} },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

  }));

  it('should navigate to the default route', fakeAsync(() => {
    router.initialNavigation();
    tick();
    router.navigate(['books']);
    tick();
    expect(location.path()).toBe('/books');
  }));

  it('should navigate to book edit', fakeAsync(() => {
    router.navigate(['books', 1, 'edit']);
    tick();
    expect(location.path()).toBe('/books/1/edit');
    expect(fixture.nativeElement.innerHTML).toContain('book edit');
  }));

  // it('should navigate to the default route',
  //   // tslint:disable-next-line:no-shadowed-variable
  //   inject([Router, Location], fakeAsync((router: Router, location: Location) => {
  //       router.initialNavigation();
  //       tick();
  //       router.navigate(['books']);
  //       tick();
  //       expect(location.path()).toBe('/books');
  //     })
  //   ));

  // it('should navigate to book edit',
  //   // tslint:disable-next-line:no-shadowed-variable
  //   inject([Router, Location], fakeAsync((router: Router, location: Location) => {
  //       router.navigate(['books', 1, 'edit']);
  //       tick();
  //       expect(location.path()).toBe('/books/1/edit');
  //       expect(fixture.nativeElement.innerHTML).toContain('book edit');
  //     })
  //   ));
});

