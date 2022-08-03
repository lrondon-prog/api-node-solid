import { AuthorRepository } from '../repository/author.repository';
import { BookRepository } from '../repository/book.repository';
import { CreateBookService } from '../services/createBook.service';

export const makeCreateBookService = (): CreateBookService => {
  return new CreateBookService(new BookRepository(), new AuthorRepository());
};
