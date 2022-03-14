import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';






@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'phone_number', 'zone', 'adress', 'email', 'detail'];
  dataSource :any

  name:any
  phone_number:any
  zone:any
  adress:any
  email:any
  detail:any


  constructor( private readonly clientService : ClientsService) { }

  ngOnInit(): void {
  }



  allClients() {
    this.clientService.getClients().subscribe( (response) => {
     this.dataSource = response
    })
  }

  onSend(){
    const client = new Client({
      name : this.name,
      phone_number : this.phone_number,
      zone : this.zone,
      adress : this.adress,
      email : this.email,
      detail : this.detail
    });
    this.clientService.postClient(client).subscribe((response) => {
      location.reload()
      console.log(response)
    });
  }
  }


