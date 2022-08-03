import { Book } from '../entities/book';

export interface IBookRepository {
  create(book: Book): Promise<Book>;
}