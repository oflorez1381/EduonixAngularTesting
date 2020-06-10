import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {BookModel} from '../../models/book/book.model';
import {RouterTestingModule} from '@angular/router/testing';
import * as faker from 'faker';
import {By} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BookEditComponent} from './book-edit.component';

describe('BookEditComponent', () => {
  let component: BookEditComponent;
  let fixture: ComponentFixture<BookEditComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookEditComponent ],
      imports: [ RouterTestingModule, ReactiveFormsModule, FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  afterEach(() => {
    if (component.book){
      component.book.destroy();
    }
  });

  function fillTheForm(image, title, description, price) {
    component.bookEditForm.controls.image.setValue(image);
    component.bookEditForm.controls.title.setValue(title);
    component.bookEditForm.controls.description.setValue(description);
    component.bookEditForm.controls.price.setValue(price);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have blank fields in reactive form', () => {
    expect(component.bookEditForm.value).toEqual({
      image: '',
      title: '',
      description: '',
      price: ''
    });
  });

  it('should have submit button if required fields are not filled in',
    fakeAsync(() => {
      const spy = spyOn(component, 'submitReactiveForm');
      fillTheForm('', '', faker.lorem.paragraph(), faker.commerce.price());
      const button = nativeElement.querySelector('#reactiveSubmitButton');
      button.dispatchEvent(new Event('click'));
      expect(spy).not.toHaveBeenCalled();
      expect(button.hasAttribute('disabled')).toBe(true);
    })
  );

  it('should have submit enabled if required fields are filled in',
    fakeAsync(() => {
      const spy = spyOn(component, 'submitReactiveForm').and.callThrough();

      fillTheForm(
        faker.image.image(),
        faker.lorem.sentence(),
        faker.lorem.paragraph(),
        faker.commerce.price()
      );

      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button')).nativeElement;
      button.click();
      tick();
      expect(spy).toHaveBeenCalled();
      const bookFromStorage = BookModel.find(component.book.title);
      expect(bookFromStorage).toEqual(component.book);
    })
  );
});
