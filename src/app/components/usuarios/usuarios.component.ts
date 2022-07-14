import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product';
import { ProductsService } from '../../services/products.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PDFService } from 'src/app/services/pdf.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductData } from 'src/app/models/ProductData';
import { DialogData } from 'src/app/models/DialogData';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ProductUpPriceData } from 'src/app/models/ProductUpPriceData';
import { UntypedFormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { UserData } from 'src/app/models/UserData';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})

export class UsuariosComponent implements AfterViewInit {
  creado: boolean;
  displayedColumns: string[] = ['email', 'rol', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<UserData>();
  emailFormControl = new UntypedFormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly userService: UsersService, private dialog: MatDialog, private pdfService: PDFService, private readonly router: Router, private readonly route: ActivatedRoute) {
    this.dataSource = new MatTableDataSource();
    this.allUsers();
    this.creado = false
  }


  email: string;
  password: string;
  rol:number
  valor: number

  delete !: boolean



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  allUsers() {
    this.userService.getUsers().subscribe((response) => {
      const users = response as UserData[]
      this.dataSource.data = users
    })
  }

  goToEditPage(id: number) {
    this.router.navigateByUrl(`/dyg/edit/usuarios/${id}`);
  }

  generarPDF() {
    this.pdfService.generarPDFProductos().subscribe((response: any) => {
      const source = `data:application/pdf;base64,${response.finalString}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `productos.pdf`;
      link.click();
    });;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onCreateUser() {
    const user = new User({
      email: this.email,
      password: this.password,
      rol:this.rol
    });
    this.userService.postUser(user).subscribe((response) => {

    });
    this.creado = true
    setTimeout(() => {
      location.reload()
    }, 750);
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(EliminarDialogoUsuarios, {
      width: '250px',
      data: { delete: this.delete },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.userService.deleteUser(id).subscribe((response) => {
          setTimeout(() => {
            location.reload()
          }, 100);
        })
      }
    })
  }
}


@Component({
  selector: 'eliminar-dialog-usuarios',
  templateUrl: 'eliminar-dialog.html',
  styleUrls: ['eliminar-dialog.scss'],
})
export class EliminarDialogoUsuarios {
  id: number = 0;
  constructor(
    public dialogRef: MatDialogRef<UsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private productService: ProductsService,
    private readonly router: Router,
    private route: ActivatedRoute,
    private readonly userService: UsersService,
  ) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete() {
    this.userService.deleteUser(this.id).subscribe((response) => {
      this.onNoClick()
    })
    setTimeout(() => {
      location.reload()
    }, 500);

  }

}
