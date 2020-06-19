import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {CartService} from './cart.service';
import {of} from 'rxjs';
import {CartList} from './cart.service.mock';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

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

const mockResponse = {
  documents: [
    {
      name: 'projects/angular-tdd-eduonix/databases/(default)/documents/cart/sxS5BymhG2VNX3UYUOrX',
      fields: {
        genre: {
          mapValue: {}
        },
        category: {
          stringValue: 'not defined'
        },
        price: {
          integerValue: '100.100'
        },
        title: {
          stringValue: 'Hello world'
        },
        description: {
          stringValue: 'Hello world description'
        },
        image: {
          stringValue: 'https://www.planwallpaper.com/static/images/Benjamin-Blonder.png'
        },
        upvotes: {
          integerValue: '0'
        }
      },
      createTime: '2017-12-08T14:16:52.061390Z',
      updateTime: '2017-12-08T14:16:52.061390Z'
    }]
};

describe('CartService', () => {
  let service: CartService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        HttpClientTestingModule
      ],
      providers: [
        CartService,
        { provide: AngularFirestore, useValue: AngularFirestoreMock }
      ]
    });
    service = TestBed.inject(CartService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // tslint:disable-next-line:no-shadowed-variable
  it('should have add method defined', () => {
    expect(service.add).toBeTruthy();
  });

  // tslint:disable-next-line:no-shadowed-variable
  it('should have query method defined', () => {
    expect(service.query).toBeTruthy();
  });

  // tslint:disable-next-line:no-shadowed-variable
  it('should have query method working', fakeAsync(() => {
    const all$ = service.query();
    let response;

    all$.subscribe((items) => {
      response = items;
    });

    tick();

    expect(response).toBe(CartList);
  }));

  it('should have callHttp working', () => {
      service.httpCall().subscribe(
        res => expect(res).toEqual(mockResponse, 'should return expected results'),
        fail
      );
      const req = httpTestingController.expectOne(service.hardCodedUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    });
});
