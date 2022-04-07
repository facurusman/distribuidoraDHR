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

export interface ProductElement {
  id: number;
  descripcion: string;
  precio_base: string;
}

export interface DialogData {
  delete: boolean
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})

export class ProductsComponent implements AfterViewInit {
  creado: boolean;

  constructor(private readonly productService: ProductsService, private dialog: MatDialog, private pdfService: PDFService, private readonly router: Router) {
    this.dataSource = new MatTableDataSource();
    this.allProducts();
    this.creado = false
  }
  displayedColumns: string[] = ['select', 'id', 'descripcion', 'precio_base', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<ProductElement>();
  selection = new SelectionModel<ProductElement>(true, []);

  descripcion: string = '';
  precio_base: number = 0;

  delete !: boolean

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  allProducts() {
    this.productService.getProducts().subscribe((response) => {
      console.log(response)
      const user = response as ProductElement[]
      console.log(user)
      //const users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));
      this.dataSource.data = user
    })
  }

  goToEditPage(id:number){
    this.router.navigateByUrl(`/dhr/edit/product/${id}`);
  }

  generarPDF() {
    console.log("estoy generando pdf")
    this.pdfService.generarPDFProductos().subscribe((response: any) => {
      const source = `data:application/pdf;base64,${response.finalString}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `productos.pdf`;
      link.click();
    });;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    console.log(this.selection);
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  aumentar() {
    console.log(this.selection.selected);
  }

  onCreateProduct() {
    const product = new Product({
      descripcion: this.descripcion,
      precio_base: this.precio_base
    });
    console.log(product)
    this.productService.postProduct(product).subscribe((response) => {
      console.log(response);
    });
    this.creado = true
    setTimeout(() => {
      location.reload()
    }, 750);
  }

  openDialog(id:number): void{
    const dialogRef = this.dialog.open(EliminarDialogoProducts, {
      width: '250px',
      data: {delete : this.delete},
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.productService.deleteProduct(id).subscribe( (response) => {
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
export class EliminarDialogoProducts {
  id: number = 0;
  constructor(
    public dialogRef: MatDialogRef<ProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private productService: ProductsService,
    private readonly router: Router,
    private route: ActivatedRoute
  ) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete() {
    this.productService.deleteProduct(this.id).subscribe((response) => {
      this.onNoClick()
    })
    setTimeout(() => {
      location.reload()
    }, 500);

  }

}
