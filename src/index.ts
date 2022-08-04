import express from 'express';
import mongoose from 'mongoose';
import { Book } from './entities/book';
import { DigitalBook } from './entities/digitalBook';
import { makeCreateBookService } from './factory/createBookService.factory';

const authorSchema = new mongoose.Schema({
  nome: 'String',
  quantidade_livros: { type: 'Number', required: true, default: 0 },
});

const bookSchema = new mongoose.Schema({
  titulo: 'String',
  qtd_paginas: 'Number',
  autor: { type: mongoose.Types.ObjectId, ref: 'Author' },
  data_publicacao: 'Date',
  tamanho: 'Number',
  compativel_kindle: 'Boolean',
});

export const BookModel = mongoose.model('Book', bookSchema);
export const AuthorModel = mongoose.model('Author', authorSchema);

const app = express();
app.use(express.json());

const urlBD = 'mongodb://localhost:27017/api';
mongoose
  .connect(urlBD)
  .then(() => {
    console.log('conectado ao banco');
  })
  .catch((err) => {
    console.log('erro ao conectar no banco');
  });

app.get('/', (req, res) => {
  res.status(200).send({
    name: 'treinamento-renave-solid',
    version: '1.0.0',
  });
});

app.post('/authors', async (req, res) => {
  const { name } = req.body;

  if (!name || name.trim().length == 0) {
    return res.status(404).send({
      message: 'autor é obrigatório e não pode ser vazio',
      data: null,
    });
  }

  const authorCreated = await AuthorModel.create({ nome: name });
  res.status(200).send({
    message: 'author created',
    data: authorCreated.toObject(),
  });
});

app.get('/authors', async (req, res) => {
  const authors = await AuthorModel.find({});

  return res.status(200).send({
    message: 'authors listed with success',
    data: authors,
  });
});

app.get('/books', async (req, res) => {
  const books = await BookModel.find({}).populate('autor');

  res.status(200).send({
    message: 'books listed with success',
    data: books,
  });
});

app.post('/books', async (req, res) => {
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

app.listen(3000, () => {
  console.log('app listen on port: ' + 3000);
});
