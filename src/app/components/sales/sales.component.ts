import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { SaleData } from 'src/app/models/SaleData';
import { ProductData } from 'src/app/models/ProductData';
import { ClientData } from 'src/app/models/ClientData';
import { PDFService } from 'src/app/services/pdf.service';



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

export class SalesComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  dataSourceVentas = new MatTableDataSource<SaleData>();
  displayedColumnsVentas: string[] = ['id', 'idCliente', 'fecha', 'total'];
  @ViewChild('TableVentasSort', {static: true}) tableVentasSort: MatSort;
  @ViewChild('TableVentasPaginator', {static: true}) tableVentasPaginator: MatPaginator;
  selection = new SelectionModel<SaleData>(true, []);
  displayedColumnsProductos: string[] = ['id', 'descripcion', 'precio', 'agregar'];
  dataSourceProductos = new MatTableDataSource<ProductData>();
  @ViewChild('TableProductosPaginator', {static: true}) tableProductosPaginator: MatPaginator;
  @ViewChild('TableProductosSort', {static: true}) tableProductosSort: MatSort;
  displayedColumnsCarrito: string[] = ['idProducto', 'descripcion', 'precio', 'eliminar'];
  dataSourceCarrito = new MatTableDataSource<ProductData>();
  productosEnCarrito: ProductData[] = [];

  idCliente: any
  fecha: Date = new Date()
  total: any
  client: any;
  clientList: ClientData[] = []
  selected = 'option2';
  id: number = 0

  fecha_inicial: any
  fecha_final: any

  total_final: number = 0;
  constructor(
    private readonly saleService: SalesService,
    private readonly productService: ProductsService,
    private route: ActivatedRoute,
     private pdfService: PDFService,
    private readonly clientService: ClientsService) {
    this.id = this.route.snapshot.params['id'];
    // Assign the data to the data source for the table to render
    this.dataSourceVentas = new MatTableDataSource();
    this.getSales()
    this.allClients()


  }


  matcher = new MyErrorStateMatcher();
  ngOnInit() {
    this.dataSourceVentas.paginator = this.tableVentasPaginator;
    this.dataSourceVentas.sort = this.tableVentasSort;
    this.dataSourceProductos.paginator = this.tableProductosPaginator;
    this.dataSourceProductos.sort = this.tableProductosSort;
  }

  getSales() {
    if (this.id) {
      this.saleService.getSalesByClient(this.id).subscribe((response) => {
        const sale = response as SaleData[]
        this.dataSourceVentas.data = sale
      })
    } else {
      this.saleService.getSales().subscribe((response) => {
        const sale = response as SaleData[]
        this.dataSourceVentas.data = sale
      });
    }
  }

  updateTableFilter() {
    //this.fecha_inicial = this.fecha_inicial.split("-").reverse().join("-");
    //this.fecha_final = this.fecha_final.split("-").reverse().join("-");
    this.saleService.filterSale(this.fecha_inicial, this.fecha_final).subscribe((response) => {
      const sale = response as SaleData[]
      this.dataSourceVentas.data = sale
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceVentas.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSourceVentas.data.forEach(row => this.selection.select(row));
  }

  applyFilterVentas(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceVentas.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceVentas.paginator) {
      this.dataSourceVentas.paginator.firstPage();
    }
  }

  applyFilterProductos(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceVentas.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceVentas.paginator) {
      this.dataSourceVentas.paginator.firstPage();
    }
  }


  allProductsClient(id: number) {
    this.productService.getProductsByCliente(id).subscribe((response) => {
      const user = response as ProductData[]
      this.dataSourceProductos = new MatTableDataSource<ProductData>(user);
    })
  }

  allClients() {
    this.clientService.getClients().subscribe((response: any) => {
      const clientes = response as ClientData[];
      clientes.forEach(element => {
        this.clientList.push(element)
      });
    })
  }


  agregarElemento(id: number, precio: string, precio_base: string, descripcion: string) {
    this.productosEnCarrito.push({ id: id, precio: precio, precio_base: precio_base, descripcion: descripcion })
    this.dataSourceCarrito = new MatTableDataSource<ProductData>(this.productosEnCarrito);
    if (precio) {
      this.total_final += +precio;
    } else {
      this.total_final += +precio_base;
    }

  }

  eliminarElemento(producto: ProductData) {
    const indice = this.productosEnCarrito.findIndex(p => p.id == producto.id)
    this.productosEnCarrito.splice(indice, 1)
    this.productosEnCarrito = [...this.productosEnCarrito]
    this.dataSourceCarrito = new MatTableDataSource<ProductData>(this.productosEnCarrito);
    if (producto.precio) {
      this.total_final -= +producto.precio;
    } else {
      this.total_final -= +producto.precio_base;
    }
  }

  clickEnSelector(idCliente: number) {
    this.allProductsClient(idCliente)
    this.idCliente = idCliente
  }

  onCreateSale() {
    const sale = new Sale({
      idCliente: this.idCliente,
      fecha: this.fecha,
      total: this.total_final
    });
    this.saleService.postSale(sale).subscribe((response:any) => {
      let idVentaNueva = response.venta.insertId;
      console.log('La nueva venta insertada es:', idVentaNueva )
      //ACa se deberia mandar al backend los productos ne carrito y el nuevo id.
      // en el backend recibe eso y los guarda todos en en la tabla productos_por_venta

    });
    setTimeout(() => {
      location.reload()
    }, 100);
  }

  generarPDF() {
      this.pdfService.generarPDFVentas().subscribe((response: any) => {
      const source = `data:application/pdf;base64,${response.finalString}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `ventas.pdf`;
      link.click();
    });;
  }

}
