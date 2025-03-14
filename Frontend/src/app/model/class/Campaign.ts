export class Campaign {
  _id: string;
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
  progress?: number; // Added this
  isFavorite?: boolean; // Added this
  raisedAmount:number;
  constructor(
    _id:string='',
    title: string = '',
    raisedAmount:number=0,
    description: string = '',
    amountGoal: number = 0,
    image: string = '',
    images: string[] = [],
    startDate: Date = new Date(),
    endDate: Date = new Date(),
    localisation: string = '',
    type: string = '',
    code_postal: string = '',
    user:string = '',
    progress: number = 0, // Default value added
    isFavorite: boolean = false // Default value added
  ) {
    this._id=_id;
    this.title = title;
    this.raisedAmount = raisedAmount;
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
    this.progress = progress;
    this.isFavorite = isFavorite;
  }
}
