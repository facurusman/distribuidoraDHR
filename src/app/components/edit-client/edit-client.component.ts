import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  nombre : string = ''
  telefono : string = ''
  zona : string = ''
  direccion : string = ''
  email : string = ''
  detalle : string = ''
  id: number = 0;

  constructor(private readonly clientService :ClientsService, private readonly router : Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe( (response: any) => {
      this.nombre = response.nombre
      this.telefono = response.telefono
      this.zona = response.zona
      this.direccion = response.direccion
      this.email = response.email
      this.detalle = response.detalle
      //otrod
     })
  }
  onEdit(){
    const client = new Client({
      nombre : this.nombre,
      telefono : this.telefono,
      email : this.email,
      zona : this.zona,
      direccion : this.direccion,
      detalle : this.detalle
    });
    this.clientService.editClient(client, this.id ).subscribe((response) => {
      return response
    });
  }
}
