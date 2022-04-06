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

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


export interface ProductElement {
  id: number;
  descripcion: string;
  precio_base: string;
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
  displayedColumns: string[] = ['select', 'id', 'name', 'progress', 'fruit', 'action'];
  dataSource: MatTableDataSource<UserData>;
  selection = new SelectionModel<UserData>(true, []);
  displayedColumnsV: string[] = ['idCliente', 'idProducto', 'descripcion', 'precio_base'];
  dataSourceV: PeriodicElement[] = [];
  productosEnCarrito: PeriodicElement[] = [];
  displayedColumnsP: string[] = ['id', 'descripcion', 'precio_base', 'agregar'];
  dataSourceP = new MatTableDataSource<ProductElement>();

  idCliente: any
  fecha: any


  client: any;
  clientList: ClienteElement[] = []
  selected = 'option2';


  matcher = new MyErrorStateMatcher();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  total_final: number = 0;
  constructor(private readonly saleService: SalesService, 
          private readonly productService: ProductsService, private readonly clientService: ClientsService) {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => this.createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
    this.allClients()
    this.allProducts()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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


  /** Builds and returns a new User. */
  createNewUser(id: number): UserData {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      '.';

    return {
      id: id.toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
    };

  }

  allProducts() {
    this.productService.getProducts().subscribe((response) => {
      const user = response as ProductElement[]
      this.dataSourceP.data = user
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

  onCreateProduct() {

  }

  agregarElemento(){
    console.log("adadasdadsasd")
    this.dataSourceV = []
    this.productosEnCarrito.push({ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' })
    this.dataSourceV = this.productosEnCarrito;
    console.log(this.productosEnCarrito);
  }

  clickEnSelector(idCliente: number){
    alert(idCliente);
    //ya tengo el id del cliente
    // tengo que llamar a la api,para que me traiga los productos por este cliente
    // para mostrar en la tabla de abajo.
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
