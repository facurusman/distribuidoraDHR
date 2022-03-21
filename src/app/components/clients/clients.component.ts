import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';

export interface PeriodicElement {
  name: string;
  phone_number: string;
  zone: string;
  adress: string;
  email: string;
  detail: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name : "Lucas", phone_number : "11-2176", zone : "villa", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa", adress : "murialdo", email : "rusman", detail : "holaaa"},
];

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phone_number', 'zone', 'adress', 'email', 'detail'];
  dataSource = ELEMENT_DATA;

  name:any
  phone_number:any
  zone:any
  adress:any
  email:any
  detail:any

  constructor(private readonly clientService: ClientsService) {}

  ngOnInit(): void {}

  allClients() {
    this.clientService.getClients().subscribe( (response) => {
     console.log(response)
    })
  }

  onSend() {
    const client = new Client({
      name: this.name,
      phone_number: this.phone_number,
      zone: this.zone,
      adress: this.adress,
      email: this.email,
      detail: this.detail,
    });
    this.clientService.postClient(client).subscribe((response) => {
      location.reload();
      console.log(response);
    });
  }
}
