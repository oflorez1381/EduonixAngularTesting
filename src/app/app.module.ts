import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BookComponent} from './components/book/book.component';
import {BookListComponent} from './components/book-list/book-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BookEditComponent} from './components/book-edit/book-edit.component';
import {TreeComponent} from './components/tree/tree.component';
import {NgInitDirective} from './directive/ng-init.directive';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookListComponent,
    BookEditComponent,
    TreeComponent,
    NgInitDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
