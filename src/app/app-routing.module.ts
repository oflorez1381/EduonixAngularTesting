import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookComponent} from './components/book/book.component';
import {BookListComponent} from './components/book-list/book-list.component';
import {BookEditComponent} from './components/book-edit/book-edit.component';


const routes: Routes = [
  { path: 'books/new', component: BookEditComponent },
  { path: 'books/:title', component: BookComponent },
  { path: 'books/:title/edit', component: BookEditComponent },
  { path: 'books', component: BookListComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
