import express from 'express';
import mongoose from 'mongoose';

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

const BookModel = mongoose.model('Book', bookSchema);
const AuthorModel = mongoose.model('Author', authorSchema);

const app = express();
app.use(express.json());

mongoose
  .connect('mongodb://localhost/treinamento-solid-renave')
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
  const { title, qtdPages, authorId, publishDate, isDigital, sizeInKBytes, kindleCompatible } =
    req.body;

  if (isDigital) {
    if (!sizeInKBytes || sizeInKBytes == 0) {
      return res.status(404).send({
        message: 'livro digital deve ter sizeInKBytes ser maior que zero',
        data: null,
      });
    }
  }

  const date = new Date(publishDate);
  if (date.getTime() > new Date().getTime()) {
    return res.status(404).send({
      message: 'a data de publicação não pode ser no futuro',
      data: null,
    });
  }

  const authorFound = await AuthorModel.findOne({ _id: authorId });
  if (!authorFound) {
    return res.status(404).send({
      message: 'o autor informado não existe',
      data: null,
    });
  }

  authorFound.quantidade_livros++;

  await AuthorModel.updateOne(
    { _id: authorId },
    { quantidade_livros: authorFound.quantidade_livros },
  );

  const bookCreated = await BookModel.create({
    titulo: title,
    qtd_paginas: qtdPages,
    autor: authorId,
    data_publicacao: new Date(publishDate),
    compativel_kindle: kindleCompatible == true,
    tamanho: sizeInKBytes,
  }).then((obj) => obj.populate('autor'));

  return res.status(200).send({
    message: 'book created successfuly',
    data: bookCreated.toObject(),
  });
});

app.listen(3000, () => {
  console.log('app listen on port: ' + 3000);
});
