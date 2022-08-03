import { Book } from './book';

export class DigitalBook extends Book {
  constructor(
    public title: string,
    public qtdPages: number,
    public authorId: string,
    public publishDate: Date,
    public sizeInKBytes: number,
    public kindleCompatible: boolean,
    public id?: string,
  ) {
    super(title, qtdPages, authorId, publishDate, id);
  }

  public validate(): void {
    super.validate();

    if (!this.sizeInKBytes || this.sizeInKBytes == 0) {
      throw new Error('livro digital deve ter sizeInKBytes ser maior que zero');
    }
  }
}
