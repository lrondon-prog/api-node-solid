import { AuthorModel } from './../index';

export class AuthorRepository {
  public async findAuthorById(id: string) {
    return await AuthorModel.findOne({ _id: id });
  }

  public async updateQtdBooksAuthor(authorId: string, qtdBooks: number) {
    await AuthorModel.updateOne({ _id: authorId }, { quantidade_livros: qtdBooks });
  }
}
