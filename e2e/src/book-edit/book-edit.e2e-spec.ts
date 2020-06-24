import {BookEditPage} from './book-edit.po';
import {BookPage} from '../book/book.po';
import * as faker from 'faker';

describe('Book edit page', () => {
  // tslint:disable-next-line:prefer-const
  let bookEdit: BookEditPage;

  beforeEach(() => {
    // browser.waitForAngularEnabled(false);
    this.bookEdit = new BookEditPage();
  });

  it('should have reactive form working', () => {
    const image = faker.image.image();
    const title = faker.lorem.sentence();
    const description = faker.lorem.sentence();

    this.bookEdit.setTitle(title);
    this.bookEdit.setImage(image);
    this.bookEdit.setDescription(description);
    this.bookEdit.submitReactive();

    const bookPage = new BookPage(title);
    expect(bookPage.titleElement.getText()).toEqual(title);
    expect(bookPage.imageElement.getAttribute('src')).toContain(image);
    expect(bookPage.descriptionElement.getText()).toEqual(description);
  });
});
