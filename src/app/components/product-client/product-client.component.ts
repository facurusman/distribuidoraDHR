import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductClientData } from 'src/app/models/ProductClientData';
import { ProductsService } from 'src/app/services/products.service';




/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-product-client',
  styleUrls: ['product-client.component.scss'],
  templateUrl: 'product-client.component.html',
})
export class ProductClientComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'descripcion', 'precio_base'];
  dataSource: MatTableDataSource<ProductClientData>;
  selection = new SelectionModel<ProductClientData>(true, []);
  disabled = false;
  precio: string = ''
  idcliente: string = '';
  valores = [];
  productosSeleccionados: ProductClientData[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly router: Router, private readonly productService: ProductsService, private readonly route: ActivatedRoute) {
    this.idcliente = this.route.snapshot.params['id'];
    this.dataSource = new MatTableDataSource();
    this.getProductsByCliente();
  }


  getProductsByCliente() {
    this.productService.getProductsByCliente(this.idcliente).subscribe((response) => {
      const productos = response as ProductClientData[]
      productos.forEach(element => {
        element.precio_mostrar = element.precio ? element.precio : element.precio_base
      });
      this.dataSource.data = productos
    });
  }

  goToClientPage() {
    this.router.navigateByUrl('/dyg/clients');
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

  marcar(ob: MatCheckboxChange, row: ProductClientData) {
    if (ob.checked) {
      this.productosSeleccionados.push(row);
      row.selected = true;
    } else {
      this.productosSeleccionados = this.productosSeleccionados.filter(p => p.id != row.id)
      row.selected = false;
    }
  }

  editarProductos() {
    this.productService.editarProductoPorCliente(this.idcliente, this.productosSeleccionados).subscribe((response) => {
      setTimeout(() => {
        this.router.navigateByUrl('/dyg/clients');
      },250);
    });
  }
}




