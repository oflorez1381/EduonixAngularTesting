import {Component, OnInit} from '@angular/core';
import {BookModel} from '../../models/book/book.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  bookEditForm: FormGroup;
  book: BookModel;
  activeForm = 'reactive';

  constructor(fb: FormBuilder, private route: ActivatedRoute) {
    this.bookEditForm = fb.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      description: [''],
      price: ['']
    });

    route.params.subscribe(res => {
      this.book = BookModel.find(res.title);
      if (this.book == null){
        this.book = new BookModel('', '', '', 0);
      }
    });
  }

  submitReactiveForm(){
    const bookData = this.prepareSaveBook();
    this.book = new BookModel(
      bookData.image,
      bookData.title,
      bookData.description,
      bookData.price
    );
    this.book.save();
  }

  ngOnInit() {
  }

  private prepareSaveBook() {
    const formModel = this.bookEditForm.value;
    return formModel;
  }

}
