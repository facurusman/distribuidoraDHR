import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ListData } from 'src/app/models/ListData';
import { ClientsService } from 'src/app/services/clients.service';
import { ListsService } from 'src/app/services/lists.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  nombre: string = '';
  telefono: string = '';
  zona: string = '';
  direccion: string = '';
  email: string = '';
  detalle: string = '';
  id: number = 0;
  lista: number;
  porcentajesList:any = [];

  creado: boolean;
  constructor(
    private readonly clientService: ClientsService,
    private readonly listaService: ListsService,
    private readonly router: Router,
    private route: ActivatedRoute
  ) {
    this.getLists();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe((response: any) => {
      this.nombre = response[0].nombre;
      this.telefono = response[0].telefono;
      this.zona = response[0].zona;
      this.direccion = response[0].direccion;
      this.email = response[0].email;
      this.detalle = response[0].detalle;
      this.lista = response[0].lista;
      this.creado = false;
      //otrod
    });
  }

  getLists() {
    this.listaService.getLists().subscribe(response => {
      const porcentaje = response as ListData[]
      porcentaje.forEach(element => {
        this.porcentajesList.push(element.porcentaje)
      });
    });
  }

  onEdit() {
    const client = new Client({
      nombre: this.nombre,
      telefono: this.telefono,
      email: this.email,
      zona: this.zona,
      direccion: this.direccion,
      detalle: this.detalle,
      lista: this.lista
    });
    this.clientService.editClient(client, this.id).subscribe(response => {
      return response;
    });
    this.creado = true;
    setTimeout(() => {
      this.router.navigateByUrl('/dyg/clients');
    }, 500);
  }
}
