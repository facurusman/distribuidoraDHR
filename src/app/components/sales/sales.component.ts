import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sale } from 'src/app/models/sale';
import { SalesService } from '../../services/sales.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductsService } from '../../services/products.service';
import { ClientsService } from '../../services/clients.service';

export interface SaleData {
  id: number;
  idCliente: number;
  fecha: string;
}


export interface PeriodicElement {
  id: number;
  descripcion: string;
  precio_base:string;
  precio: string;
}


export interface ProductElement {
  id: number;
  descripcion: string;
  precio_base:string;
  precio: string;
}

export interface ClienteElement {
  detalle: string;
  direccion: string;
  email: string;
  id: number;
  nombre: string;
  telefono: string;
  zona: string;
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
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})

export class SalesComponent implements AfterViewInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  displayedColumns: string[] = ['id', 'idCliente', 'fecha'];
  dataSource: MatTableDataSource<SaleData>;
  selection = new SelectionModel<SaleData>(true, []);
  displayedColumnsV: string[] = ['idProducto', 'descripcion', 'precio', 'eliminar'];
  dataSourceV: MatTableDataSource<ProductElement>;
  productosEnCarrito: ProductElement[] = [];
  displayedColumnsP: string[] = ['id', 'descripcion', 'precio', 'agregar'];
  dataSourceP:MatTableDataSource<ProductElement>;
  idCliente: any
  fecha: any
  client: any;
  clientList: ClienteElement[] = []
  selected = 'option2';

  fecha_inicial:any
  fecha_final:any


  matcher = new MyErrorStateMatcher();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  total_final: number = 0;
  constructor(
    private readonly saleService: SalesService,
    private readonly productService: ProductsService,
    private readonly clientService: ClientsService) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.getSales()
    this.allClients()


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getSales (){
    this.saleService.getSales().subscribe( (response) => {
      const sale = response as SaleData[]
      this.dataSource.data = sale
    });
  }

  updateTableFilter(){
    
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

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


  allProductsClient(id:number) {
    this.productService.getProductsByCliente(id).subscribe((response) => {
      const user = response as ProductElement[]
      this.dataSourceP = new MatTableDataSource<ProductElement>(user);
    })
  }

  allClients() {
    this.clientService.getClients().subscribe((response: any) => {
      const clientes = response as ClienteElement[];
      clientes.forEach(element => {
        this.clientList.push(element)
      });
    })
  }


  agregarElemento(id:number, precio:string, precio_base:string, descripcion: string){
    this.productosEnCarrito.push({ id: id, precio: precio, precio_base: precio_base, descripcion: descripcion })
    this.dataSourceV = new MatTableDataSource<ProductElement>(this.productosEnCarrito);
    if(precio){
      this.total_final += +precio;
    }else{
      this.total_final += +precio_base;
    }

  }

  eliminarElemento(producto: ProductElement){
    this.productosEnCarrito = this.productosEnCarrito.filter(p => p.id != producto.id)
    this.dataSourceV = new MatTableDataSource<ProductElement>(this.productosEnCarrito);
    if(producto.precio){
      this.total_final -= +producto.precio;
    }else{
      this.total_final -= +producto.precio_base;
    }

  }

  clickEnSelector(idCliente: number){
    this.allProductsClient(idCliente)
  }

  onCreateSale() {
    const sale = new Sale({
      idCliente: this.idCliente,
      fecha: this.fecha,
    });
    this.saleService.postSale(sale).subscribe((response) => {
      console.log(response);
    });
  }

}
