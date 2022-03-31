import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  name : string = ''
  phone_number : string = ''
  zone : string = ''
  adress : string = ''
  email : string = ''
  detail : string = ''
  id: number = 0;

  constructor(private readonly clientService :ClientsService, private readonly router : Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe( (response: any) => {
      this.name = response.name
      this.phone_number = response.phone_number
      this.zone = response.zone
      this.adress = response.adress
      this.email = response.email
      this.detail = response.detail
      //otrod
     })
  }
  onEdit(){
    const client = new Client({
      name : this.name,
      phone_number : this.phone_number,
      zone : this.zone,
      adress : this.adress,
      email : this.email,
      detail : this.detail
    });
    this.clientService.editClient(client, this.id ).subscribe((response) => {
      return response
    });
  }
}
