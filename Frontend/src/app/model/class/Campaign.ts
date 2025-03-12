

export class Campaign {
  title: string;
  description: string;
  amountGoal: number;
  image: string;
  images: string[];
  startDate: Date;
  endDate: Date;
  localisation: string;
  type: string;
  code_postal: string;
  user: string;

  constructor(
    title: string = '',
    description: string = '',
    amountGoal: number = 0,
    image: string = '',
    images: string[] = [],
    startDate: Date = new Date(),
    endDate: Date = new Date(),
    localisation: string = '',
    type: string = '',
    code_postal: string = '',
    user:string = ''
  ) {
    this.title = title;
    this.description = description;
    this.amountGoal = amountGoal;
    this.image = image;
    this.images = images;
    this.startDate = startDate;
    this.endDate = endDate;
    this.localisation = localisation;
    this.type = type;
    this.code_postal = code_postal;
    this.user = user;
    
  }
}
