import { SelectionModel } from '@angular/cdk/collections';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

export interface ProductClientData {
  descripcion: string;
  precio_base: string;
  precio: string;
}


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-product-client',
  styleUrls: ['product-client.component.scss'],
  templateUrl: 'product-client.component.html',
})
export class ProductClientComponent implements AfterViewInit {
  displayedColumns: string[] = ['select','descripcion', 'precio_base'];
  dataSource: MatTableDataSource<ProductClientData>;
  selection = new SelectionModel<ProductClientData>(true, []);
  disabled = false;
  precio : string = ''
  idcliente: string = '';
  valores = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly router : Router, private readonly productService: ProductsService, private readonly route: ActivatedRoute) {
    //recibo el idCliente desde el params
    //TODO
    //falta mostrar el id recibo por params
    this.idcliente = this.route.snapshot.params['id'];
    this.dataSource = new MatTableDataSource();
    this.getProductsByCliente();
  }


  getProductsByCliente (){
    this.productService.getProductsByCliente(this.idcliente).subscribe( (response) => {
      console.log("AAAAA");
      const user = response as ProductClientData[]
      console.log(response)
      console.log("BBBBB");
      console.log(user)
      this.dataSource.data = user
    });
  }

  goToClientPage(){
    this.router.navigateByUrl('/dhr/clients');
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

  marcar(ob: MatCheckboxChange,row: ProductClientData){
    console.log(this.selection)
    if(ob.checked){
      this.selection.toggle(row);
    }else{
      this.selection.deselect(row);
    }
  }

  editarProductos(){
    console.log("los productos a editar son:")
    console.log(this.selection.selected);
    console.log(this.valores)
  }
}




