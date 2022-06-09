import { AfterViewInit, Component, ViewChild, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientData } from 'src/app/models/ClientData';
import { DialogData } from 'src/app/models/DialogData';
import { PDFService } from 'src/app/services/pdf.service';
import { ClientsService } from '../../services/clients.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss']
})
export class ListasComponent {
  creado: boolean;
  constructor(
    private readonly clientService: ClientsService,
    private dialog: MatDialog,
    private readonly router: Router,
    private route: ActivatedRoute,
    private pdfService: PDFService
  ) {
    this.dataSource = new MatTableDataSource();
    this.getClientes();
    this.creado = false;
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  displayedColumnsListas: string[] = [
    'id',
    'nombre',
    'telefono',
    'zona',
    'direccion',
    'email',
    'editar',
    'eliminar',
    'ventas',
    'productos'
  ];
  dataSource = new MatTableDataSource<ClientData>();
  matcher = new MyErrorStateMatcher();

  nombre: string = '';
  telefono: string = '';
  zona: string = '';
  direccion: string = '';
  email: string = '';
  detalle: string = '';
  delete!: boolean;
  lista: number;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getClientes() {
    this.clientService.getClients().subscribe(response => {
      const user = response as ClientData[];
      this.dataSource.data = user;
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

  goToSalesByClientPage(id: number) {
    this.router.navigateByUrl(`/dyg/sales/${id}`);
  }
  goToProductsforClientPage(id: number) {
    this.router.navigateByUrl(`/dyg/productsClient/${id}`);
  }
  goToEditPage(id: number) {
    this.router.navigateByUrl(`/dyg/edit/client/${id}`);
  }
  allClients() {
    this.clientService.getClients().subscribe(response => {});
  }

  onSend() {
    const client = new Client({
      nombre: this.nombre,
      telefono: this.telefono,
      email: this.email,
      zona: this.zona,
      direccion: this.direccion,
      detalle: this.detalle,
      lista: this.lista
    });
    this.clientService.postClient(client).subscribe(response => {});
    this.creado = true;
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  generarPDF() {
    this.pdfService.generarPDFClientes().subscribe((response: any) => {
      const source = `data:application/pdf;base64,${response.finalString}`;
      const link = document.createElement('a');
      link.href = source;
      link.download = `clientes.pdf`;
      link.click();
    });
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(EliminarDialogoListas, {
      width: '250px',
      data: { delete: this.delete }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.clientService.deleteClient(id).subscribe(response => {
          setTimeout(() => {
            location.reload();
          }, 100);
        });
      }
    });
  }
}
@Component({
  selector: 'eliminar-dialog-lista',
  templateUrl: './eliminar-dialog-lista.html',
  styleUrls: ['./eliminar-dialog-lista.scss']
})
export class EliminarDialogoListas implements OnInit {
  id: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ListasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private clientService: ClientsService,
    private readonly router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete() {
    this.clientService.deleteClient(this.id).subscribe(response => {
      this.onNoClick();
    });
    setTimeout(() => {
      location.reload();
    }, 500);
  }
}
