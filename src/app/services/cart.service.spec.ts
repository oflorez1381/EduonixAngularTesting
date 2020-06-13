import {fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {CartService} from './cart.service';
import {of} from 'rxjs';
import {CartList} from './cart.service.mock';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCZuCInoEdZny7MXIVTs3TgMVXgoIjWjns',
    authDomain: 'angular-tdd-eduonix.firebaseapp.com',
    databaseURL: 'https://angular-tdd-eduonix.firebaseio.com',
    projectId: 'angular-tdd-eduonix',
    storageBucket: 'angular-tdd-eduonix.appspot.com',
    messagingSenderId: '25723624635'
  }
};

const AngularFirestoreMock = {
  collection(param: any) {
    return {
      valueChanges() { return of(CartList); },
      add(item) { return item; }
    };
  }
};

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      providers: [
        CartService,
        { provide: AngularFirestore, useValue: AngularFirestoreMock }
      ]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // tslint:disable-next-line:no-shadowed-variable
  it('should have add method defined', inject([CartService], (service: CartService) => {
    expect(service.add).toBeTruthy();
  }));

  // tslint:disable-next-line:no-shadowed-variable
  it('should have query method defined', inject([CartService], (service: CartService) => {
    expect(service.query).toBeTruthy();
  }));

  // tslint:disable-next-line:no-shadowed-variable
  it('should have query method working', inject([CartService], fakeAsync((service: CartService) => {
    const all$ = service.query();
    let response;

    all$.subscribe((items) => {
      response = items;
    });

    tick();

    expect(response).toBe(CartList);
  })));
});
