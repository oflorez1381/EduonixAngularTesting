import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BookComponent} from './components/book/book.component';
import {BookListComponent} from './components/book-list/book-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BookEditComponent} from './components/book-edit/book-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookListComponent,
    BookEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
