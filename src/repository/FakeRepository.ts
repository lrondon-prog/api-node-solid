import { Book } from "../entities/book";
import { BookRepository } from "./book.repository";


export class FakeRepository implements BookRepository {
 
  private list: Book[] = [];

  async create(book: Book): Promise<Book> {
    // insert
    this.list.push(book);
    return book;
  }
}