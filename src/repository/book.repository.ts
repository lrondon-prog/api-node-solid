import { Book } from '../entities/book';
import { DigitalBook } from '../entities/digitalBook';
import { BookModel } from '../index';
import { IBookRepository } from './ibook.repository';

export class BookRepository implements IBookRepository {

  public async create(book: Book) {
    let bookCreated: Book;

    if (book instanceof DigitalBook) {
      const bdBook = await BookModel.create({
        titulo: book.title,
        qtd_paginas: book.qtdPages,
        autor: book.authorId,
        data_publicacao: book.publishDate,
        compativel_kindle: book.kindleCompatible == true,
        tamanho: book.sizeInKBytes,
      }).then((obj: any) => obj.populate('autor'));

      bookCreated = new DigitalBook(
        bdBook.titulo,
        bdBook.qtd_paginas,
        bdBook.autor,
        bdBook.data_publicacao,
        bdBook.tamanho,
        bdBook.compativel_kindle,
        bdBook._id
      );
    } else {
      const bdBook = await BookModel.create({
        titulo: book.title,
        qtd_paginas: book.qtdPages,
        autor: book.authorId,
        data_publicacao: book.publishDate,
      }).then((obj: any) => obj.populate('autor'));

      bookCreated = new Book(
        bdBook.titulo,
        bdBook.qtd_paginas,
        bdBook.autor,
        bdBook.data_publicacao,
        bdBook._id
      );
    }

    return bookCreated;
  }
}
