import { Author } from '../entities/author';
import { AuthorModel } from '../index';
import { AuthorRepository } from './author.repository';

export class AuthorImplementationRepository implements AuthorRepository {

  public async create(author: Author) {
    let authorCreated: Author;

      const bdAuthor = await AuthorModel.create({
        nome: author.name,
        quantidade_livros: author.qtdBooks,
      })

      authorCreated = new Author(
        bdAuthor.nome,
        bdAuthor.quantidade_livros
      );

      return authorCreated;
    } 

  public async findAuthorById(id: string): Promise<Author | null >{
    const bdAuthor = await AuthorModel.findOne({ _id: id })
    if(bdAuthor){
      const authorFound = new Author (
        bdAuthor.nome,
        bdAuthor.quantidade_livros
        );
        return authorFound;
    }
    return null;
  }

  public async updateQtdBooksAuthor(authorId: string, qtdBooks: number): Promise<void> {
    await AuthorModel.updateOne({ _id: authorId }, { quantidade_livros: qtdBooks });
  }
}