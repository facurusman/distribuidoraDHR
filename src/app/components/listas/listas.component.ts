import { AfterViewInit, Component, ViewChild, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from 'src/app/models/list';
import { ListData } from 'src/app/models/ListData';
import { DialogData } from 'src/app/models/DialogData';
import { PDFService } from 'src/app/services/pdf.service';
import { ListsService } from '../../services/lists.service';

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
    private readonly listService: ListsService,
    private dialog: MatDialog,
    private readonly router: Router,
    private route: ActivatedRoute,
    private pdfService: PDFService
  ) {
    this.dataSource = new MatTableDataSource();
    this.getLists();
    this.creado = false;
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  displayedColumnsListas: string[] = ['id', 'nombre', 'porcentaje', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<ListData>();
  matcher = new MyErrorStateMatcher();

  nombre: string = '';
  porcentaje: number;
  delete!: boolean;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getLists() {
    this.listService.getLists().subscribe(response => {
      const lista = response as ListData[];
      this.dataSource.data = lista;
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

  goToEditPage(id: number) {
    this.router.navigateByUrl(`/dyg/edit/list/${id}`);
  }
  allLists() {
    this.listService.getLists().subscribe(response => {});
  }

  onSend() {
    const list = new List({
      nombre: this.nombre,
      porcentaje: this.porcentaje
    });
    this.listService.postList(list).subscribe(response => {});
    this.creado = true;
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  generarPDF() {
    this.pdfService.generarPDFListas().subscribe((response: any) => {
      const source = `data:application/pdf;base64,${response.finalString}`;
      const link = document.createElement('a');
      link.href = source;
      link.download = `listas.pdf`;
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
        this.listService.deleteList(id).subscribe(response => {
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
    private listService: ListsService,
    private readonly router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete() {
    this.listService.deleteList(this.id).subscribe(response => {
      this.onNoClick();
    });
    setTimeout(() => {
      location.reload();
    }, 500);
  }
}
