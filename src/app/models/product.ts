export class Product {
  readonly description : string
  readonly price : number

  constructor({
    description, price
  }:{
    description:string , price:number
  }){
    this.description = description
    this.price = price
  }
}
