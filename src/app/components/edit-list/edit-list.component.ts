import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListsService } from 'src/app/services/lists.service';
import { List } from '../../models/list';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {
  id: number;
  nombre: string = '';
  porcentaje: number;

  creado: boolean;
  constructor(
    private readonly listaService: ListsService,
    private readonly router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.listaService.getList(this.id).subscribe((response: any) => {
      this.nombre = response[0].nombre;
      this.porcentaje = response[0].porcentaje;
      this.creado = false;
      //otros
    });
  }
  onEdit() {
    const lista = new List({
      nombre: this.nombre,
      porcentaje: this.porcentaje
    });
    this.listaService.editList(lista, this.id).subscribe(response => {
      return response;
    });
    this.creado = true;
    setTimeout(() => {
      this.router.navigateByUrl('/dyg/listas');
    }, 500);
  }
}
