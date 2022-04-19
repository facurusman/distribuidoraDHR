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
  displayedColumns: string[] = ['select', 'descripcion', 'precio_base', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<ProductUpPriceData>();
  selection = new SelectionModel<ProductUpPriceData>(true, []);
  productosSeleccionados: ProductUpPriceData[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly productService: ProductsService, private dialog: MatDialog, private pdfService: PDFService, private readonly router: Router, private readonly route: ActivatedRoute) {
    this.dataSource = new MatTableDataSource();
    this.allProducts();
    this.creado = false
  }


  descripcion: string = '';
  precio_base: number = 0;
  valor: number

  delete !: boolean



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  allProducts() {
    this.productService.getProducts().subscribe((response) => {
      const products = response as ProductUpPriceData[]
      this.dataSource.data = products
    })
  }

  goToEditPage(id: number) {
    this.router.navigateByUrl(`/dyg/edit/product/${id}`);
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
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
  marcar(ob: MatCheckboxChange, row: ProductUpPriceData) {
    if (ob.checked) {
      this.productosSeleccionados.push(row);
      row.selected = true;
    } else {
      this.productosSeleccionados = this.productosSeleccionados.filter(p => p.id != row.id)
      row.selected = false;
    }
  }

  aumentar() {
    console.log(this.productosSeleccionados);
    this.productService.aumentarElPrecio(this.valor,this.productosSeleccionados).subscribe((response) => {
    });
    setTimeout(() => {
      location.reload()
    }, 100);
  }

  onCreateProduct() {
    const product = new Product({
      descripcion: this.descripcion,
      precio_base: this.precio_base
    });
    this.productService.postProduct(product).subscribe((response) => {

    });
    this.creado = true
    setTimeout(() => {
      location.reload()
    }, 750);
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(EliminarDialogoProducts, {
      width: '250px',
      data: { delete: this.delete },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.productService.deleteProduct(id).subscribe((response) => {
          setTimeout(() => {
            location.reload()
          }, 100);
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
