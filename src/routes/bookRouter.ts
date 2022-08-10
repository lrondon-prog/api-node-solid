import { Router } from "express";
import { Book } from "../entities/book";
import { DigitalBook } from "../entities/digitalBook";
import { makeCreateBookService } from "../factory/createBookService.factory";
import { makeGetAllBookService } from "../factory/getAllBookService.factory";


const routesBook = Router();

routesBook.get('/books', async (req, res) => {
    try {
        const getAllBookService = makeGetAllBookService();

        const listBooks = await getAllBookService.getAllBook();

        res.status(200).send({
            message: 'books listed with success',
            data: listBooks,
        });
    } catch (error: any) {
        return res.status(400).send({
            message: error.message,
            data: null,
        });
    }
});

routesBook.post('/books', async (req, res) => {
    try {
        const { title, qtdPages, authorId, publishDate, isDigital, sizeInKBytes, kindleCompatible } =
            req.body;

        const createBookService = makeCreateBookService();

        let book: Book;
        if (isDigital) {
            book = new DigitalBook(
                title,
                qtdPages,
                authorId,
                new Date(publishDate),
                sizeInKBytes,
                kindleCompatible,
            );
        } else {
            book = new Book(title, qtdPages, authorId, new Date(publishDate));
        }

        const createdBook = await createBookService.createBook(book);

        return res.status(200).send({
            message: 'book created successfuly',
            data: createdBook,
        });
    } catch (error: any) {
        return res.status(400).send({
            message: error.message,
            data: null,
        });
    }
});

export { routesBook };