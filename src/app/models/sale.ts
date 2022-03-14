export class Sale {
  readonly name : string
  readonly total : number
  readonly date : string

  constructor({
    name, total, date
  }:{
    name:string , total:number, date:string
  }){
    this.name = name
    this.total = total
    this.date = date
  }
}

