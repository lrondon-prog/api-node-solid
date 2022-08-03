import { Book } from '../entities/book';
import { IBookRepository } from './ibook.repository';

export class FakeRepository implements IBookRepository {
  private list: Book[] = [];

  async create(book: Book): Promise<Book> {
    // insert
    this.list.push(book);
    return book;
  }
}
