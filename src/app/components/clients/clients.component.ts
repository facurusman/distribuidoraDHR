import { ComponentType } from '@angular/cdk/portal';
import { AfterViewInit, Component, ViewChild, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientsService } from '../../services/clients.service';

export interface UserData {
  id: number;
  nombre : string;
  telefono : string;
  zona : string;
  direccion : string;
  email : string;
  detalle : string;
}

export interface DialogData {
  delete : boolean
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})

export class ClientsComponent implements AfterViewInit{
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  displayedColumns: string[] = ['id', 'nombre', 'telefono', 'zona', 'direccion', 'email', 'detalle', 'editar', 'eliminar', 'ventas', 'productos'];
  dataSource: MatTableDataSource<UserData>;

  matcher = new MyErrorStateMatcher();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  nombre : string = ''
  telefono : string = ''
  zona : string = ''
  direccion : string = ''
  email : string = ''
  detalle : string = ''

  delete !: boolean
  creado : boolean

  constructor(private readonly clientService :ClientsService, private dialog: MatDialog, private readonly router : Router, private route:ActivatedRoute) {
    this.dataSource = new MatTableDataSource();
    this.getUsers();
    this.creado = false
  }

  getUsers (){
     this.clientService.getClients().subscribe( (response) => {
      console.log(response);
      const user = response as UserData[]
      console.log(user)
      this.dataSource.data = user
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  goToSalesByClientPage(id : number){
    this.router.navigateByUrl(`/dhr/sales/${id}`)
  }
  goToProductsforClientPage(id:number){
    this.router.navigateByUrl(`/dhr/productsClient/${id}`);
  }
  goToEditPage(id:number){
    this.router.navigateByUrl(`/dhr/edit/client/${id}`);
  }
  allClients() {
    this.clientService.getClients().subscribe( (response) => {
     console.log(response)
    })
  }

  onSend() {
    const client = new Client({
      nombre : this.nombre,
      telefono : this.telefono,
      email : this.email,
      zona : this.zona,
      direccion : this.direccion,
      detalle : this.detalle
    });
    this.clientService.postClient(client).subscribe( (response) => {
     console.log(response)
    })
    this.creado = true
    setTimeout(() => {
      location.reload()
    }, 500);

  }

  openDialog(id:number): void{
    const dialogRef = this.dialog.open(EliminarDialogo, {
      width: '250px',
      data: {delete : this.delete},
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.clientService.deleteClient(id).subscribe( (response) => {
          console.log(response)
         })
      }
    })
  }

}
@Component({
  selector: 'eliminar-dialog',
  templateUrl: 'eliminar-dialog.html',
  styleUrls: ['eliminar-dialog.scss'],
})
export class EliminarDialogo implements OnInit{

  id: number = 0;

  constructor(public dialogRef: MatDialogRef<ClientsComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private clientService: ClientsService, private readonly router : Router,  private route:ActivatedRoute ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete(){
    this.clientService.deleteClient(this.id).subscribe( (response) => {
      this.onNoClick()
    })
    setTimeout(() => {
      location.reload()
    }, 500);

  }
}
