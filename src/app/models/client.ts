export class Client {
  readonly name : string
  readonly phone_number : string
  readonly zone :string
  readonly adress : string
  readonly email : string
  readonly detail : string

  constructor({
    name, phone_number, zone, adress, email, detail
  }:{
    name:string, phone_number:string, zone:string, adress:string, email:string, detail:string
  }){
    this.name = name
    this.phone_number = phone_number
    this.zone = zone
    this.adress = adress
    this.email = email
    this.detail = detail
  }
}
