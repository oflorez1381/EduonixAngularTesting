import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

import {BookModel} from '../../models/book/book.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})

export class BookEditComponent implements OnInit {
  bookEditForm: FormGroup;
  bookEditDynamic: FormGroup;
  book: BookModel;
  activeForm = 'reactive';
  @ViewChild(NgForm) templateForm: NgForm;
  question: Object = {
    children: [
      {
        type: 'input',
        minLength: 3,
        maxLength: 10,
        required: true,
        label: 'Title',
        paramName: 'title'
      },
      {
        type: 'input',
        required: true,
        label: 'Image',
        paramName: 'image'
      },
      {
        type: 'input',
        required: false,
        label: 'Description',
        paramName: 'description'
      },
      {
        type: 'input',
        required: true,
        label: 'Price',
        paramName: 'price'
      },
      {
        type: 'checkbox',
        required: true,
        label: 'Fantasy',
        paramName: 'genre',
        value: 'fantasy'
      },
      {
        type: 'checkbox',
        required: true,
        label: 'Non-fiction',
        paramName: 'genre',
        value: 'non_fiction'
      },
      {
        type: 'select',
        required: true,
        label: 'Category',
        paramName: 'category',
        options: [
          {
            label: 'Home & Garden',
            paramName: 'home_and_garden'
          },
          {
            label: 'Programming',
            paramName: 'programming'
          }
        ]
      }
    ]
  };

  constructor(fb: FormBuilder, private route: ActivatedRoute) {
    this.bookEditForm = fb.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      description: [''],
      price: ['']
    });
    route.params.subscribe(res => {
      this.book = BookModel.find(res.title);
      if (this.book == null) {
        this.book = new BookModel('', '', '', 0);
      }
    });
  }

  submitReactiveForm() {
    const bookData = this.prepareSaveBook();
    this.book = new BookModel(
      bookData.image,
      bookData.title,
      bookData.description,
      bookData.price
    );
    this.book.save();
  }

  prepareSaveBook() {
    const formModel = this.bookEditForm.value;
    return formModel;
  }

  ngOnInit() {
  }

}
