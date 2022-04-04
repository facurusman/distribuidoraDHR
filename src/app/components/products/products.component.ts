import { SelectionModel } from '@angular/cdk/collections';
import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Product } from 'src/app/models/product';
import { ProductsService } from '../../services/products.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PDFService } from 'src/app/services/pdf.service';

export interface ProductElement {
  id: number;
  descripcion: string;
  precio_base: string;
}

export interface DialogData {
  delete : boolean
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})

export class ProductsComponent {

  constructor(private readonly productService: ProductsService, private dialog: MatDialog, private pdfService: PDFService){
    this.dataSource = new MatTableDataSource();
    this.allProducts();

  }
  displayedColumns: string[] = ['select', 'id' , 'descripcion', 'precio_base', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<ProductElement>();
  selection = new SelectionModel<ProductElement>(true, []);

  description: string = '';
  price: number = 0;

  delete !: boolean

  allProducts() {
    this.productService.getProducts().subscribe( (response) => {
     console.log(response)
     const user = response as ProductElement[]
      console.log(user)
      //const users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));
      this.dataSource.data = user
    })
  }

  generarPDF(){
    console.log("estoy generando pdf")
    this.pdfService.generarPDFProductos().subscribe((response) => {
      console.log("termine")
      console.log(response);
      
      console.log("termine2")
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

  aumentar(){
    console.log(this.selection.selected);
  }

  onCreateProduct() {
    const product = new Product({
      description:this.description,
      price:this.price
    });
    this.productService.postProduct(product).subscribe((response) => {
      location.reload();
      console.log(response);
    });
  }

  openDialog(): void{
    this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {delete : this.delete},
    }).afterClosed().subscribe((result: boolean) => {
      console.log('The dialog was closed');
      this.delete = result;
    })
  }
}


@Component({
  selector: 'eliminar-dialog',
  templateUrl: 'eliminar-dialog.html',
  styleUrls: ['eliminar-dialog.scss'],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<ProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
