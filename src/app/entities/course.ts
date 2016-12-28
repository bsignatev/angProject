export class Course {
  public id: string;
  public title: string;
  public description: string;
  public duration: number;
  public owner: string;
  public authors: Array<string>;
  public date: Date;
}