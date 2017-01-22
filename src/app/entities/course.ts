export class Course {
  public id: string;
  public title: string;
  public description: string;
  public duration: number;
  public owner: string;
  public authors: Array<string>;
  public date: Date;

    constructor(options: any = {}) {
    this.title = options.title;
    this.id = options.id;
    this.owner = options.owner;
    this.description = options.description;
    this.duration = options.duration;
    this.date = new Date(options.date || Date.now());
    this.authors = options.authors;
  }
}