export class Book {
  
  constructor(
    public title: string,
    public qtdPages: number,
    public authorId: string,
    public publishDate: Date,
    public id?: string
  ) {}

  public validate() {
    this.validatePublishDate();
  }

  private validatePublishDate() {
    if (this.publishDate.getTime() > new Date().getTime()) {
      throw new Error('a data de publicação não pode ser no futuro');
    }
  }
}
