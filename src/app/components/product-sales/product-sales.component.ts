import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientData } from 'src/app/models/ClientData';
import { ProductData } from 'src/app/models/ProductData';
import { SaleData } from 'src/app/models/SaleData';
import { ClientsService } from 'src/app/services/clients.service';
import { PDFService } from 'src/app/services/pdf.service';
import { ProductsService } from 'src/app/services/products.service';
import { SalesService } from 'src/app/services/sales.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Sale } from 'src/app/models/sale';
import { MatIconModule } from '@angular/material/icon';
import { UntypedFormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-sales',
  templateUrl: './product-sales.component.html',
  styleUrls: ['./product-sales.component.scss']
})
export class ProductSalesComponent implements OnInit {
  myControl = new UntypedFormControl();
  options: ClientData[] = [];
  filteredOptions: Observable<ClientData[]>;
  displayedColumnsProductos: string[] = ['id', 'descripcion', 'cantidad', 'precio', 'agregar'];
  dataSourceProductos = new MatTableDataSource<ProductData>();
  @ViewChild('TableProductosPaginator', { static: true }) tableProductosPaginator: MatPaginator;
  @ViewChild('TableProductosSort', { static: true }) tableProductosSort: MatSort;
  displayedColumnsCarrito: string[] = [
    'idProducto',
    'descripcion',
    'cantidad',
    'precio',
    'total',
    'eliminar'
  ];
  dataSourceCarrito = new MatTableDataSource<ProductData>();
  productosEnCarrito: ProductData[] = [];

  idCliente: any;
  fecha: Date = new Date();
  total: number = 0;
  client: any;
  clientList: ClientData[] = [];
  selected = 'option2';
  id: number = 0;
  total_final: number = 0;
  deuda: number = 0;
  idVenta: number;
  porcentajeCliente: number;
  cargados: boolean;
  cantidadNueva: number;

  constructor(
    private readonly saleService: SalesService,
    private readonly productService: ProductsService,
    private route: ActivatedRoute,
    private pdfService: PDFService,
    private readonly clientService: ClientsService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.allClients();
  }

  ngOnInit(): void {
    this.dataSourceProductos.paginator = this.tableProductosPaginator;
    this.dataSourceProductos.sort = this.tableProductosSort;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice()))
    );
  }

  displayFn(user: ClientData): string {
    return user && user.nombre ? user.nombre : '';
  }

  private _filter(name: string): ClientData[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  applyFilterProductos(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProductos.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceProductos.paginator) {
      this.dataSourceProductos.paginator.firstPage();
    }
  }

  allProductsClient(id: number) {
    this.productService.getProductsByCliente(id).subscribe(response => {
      const user = response as ProductData[];
      user.forEach(element => {
        if (element.precio) {
          let descuento = (+element.precio * this.porcentajeCliente) / 100;
          let descontado = +element.precio - descuento;
          element.precio = descontado;
        } else {
          let descuento = (+element.precio_base * this.porcentajeCliente) / 100;
          let descontado = +element.precio_base - descuento;
          element.precio_base = descontado;
        }
      });

      this.dataSourceProductos = new MatTableDataSource<ProductData>(user);
      this.dataSourceProductos.paginator = this.tableProductosPaginator;
      this.dataSourceProductos.sort = this.tableProductosSort;
    });
  }

  allClients() {
    this.clientService.getClients().subscribe((response: any) => {
      const clientes = response as ClientData[];
      clientes.forEach(element => {
        this.clientList.push(element);
        this.options.push(element);
      });
    });
  }

  agregarElemento(producto: ProductData) {
    const productoRepetido = this.productosEnCarrito.filter(p => p.id == producto.id);
    if (!producto.cantidad) {
      producto.cantidad = 1;
    }
    if (producto.precio) {
      this.total_final += +producto.precio * producto.cantidad;
      this.total = +producto.precio * producto.cantidad;
    } else {
      this.total_final += +producto.precio_base * producto.cantidad;
      this.total = +producto.precio_base * producto.cantidad;
    }

    if (productoRepetido.length > 0) {
      productoRepetido.forEach(element => {
        this.cantidadNueva = +element.cantidad + +producto.cantidad; //este cambia la cantidad vieja a la cantidad nueva
        producto.cantidad = this.cantidadNueva;
        //esta linea hace bien el total
        this.total += element.total;
        //de aca para abajo elimina el nuevo producto que agregaria
        const indice = this.productosEnCarrito.findIndex(p => p.id == element.id);
        this.productosEnCarrito.splice(indice, 1);
        this.productosEnCarrito = [...this.productosEnCarrito];
      });
    }
    this.productosEnCarrito.push({
      id: producto.id,
      precio: producto.precio,
      precio_base: producto.precio_base,
      cantidad: producto.cantidad,
      descripcion: producto.descripcion,
      total: this.total
    });
    this.dataSourceCarrito = new MatTableDataSource<ProductData>(this.productosEnCarrito);
  }
  eliminarElemento(producto: ProductData) {
    const indice = this.productosEnCarrito.findIndex(p => p.id == producto.id);
    this.productosEnCarrito.splice(indice, 1);
    this.productosEnCarrito = [...this.productosEnCarrito];
    this.dataSourceCarrito = new MatTableDataSource<ProductData>(this.productosEnCarrito);
    if (producto.cantidad) {
      if (producto.precio) {
        this.total_final -= +producto.precio * producto.cantidad;
        this.total -= +producto.precio * producto.cantidad;
      } else {
        this.total_final -= +producto.precio_base * producto.cantidad;
        this.total -= +producto.precio_base * producto.cantidad;
      }
    } else {
      if (producto.precio) {
        this.total_final -= +producto.precio;
        this.total -= +producto.precio;
      } else {
        this.total_final -= +producto.precio_base;
        this.total -= +producto.precio_base;
      }
    }
  }
  clickEnSelector(idCliente: number, porcentaje: number) {
    this.porcentajeCliente = porcentaje;
    this.idCliente = idCliente;
    this.allProductsClient(idCliente);
  }

  longitudCarrito() {
    if (this.productosEnCarrito.length > 0) {
      return true;
    }
    return false;
  }

  onCreateSale() {
    if (this.productosEnCarrito.length > 0) {
      if (this.deuda) {
        this.total_final += this.deuda;
      } else {
        this.deuda = 0;
        this.total_final += this.deuda;
      }
      const sale = new Sale({
        idCliente: this.idCliente,
        fecha: this.fecha,
        total: this.total_final,
        deuda: this.deuda
      });
      console.log(sale, this.deuda);
      this.saleService.postSale(sale, this.productosEnCarrito).subscribe((response: any) => {
        let idVentaNueva = response.idVentaCreada;
        this.saleService
          .getPropertiesClient(this.idCliente, idVentaNueva)
          .subscribe((response: any) => {
            const source = `data:application/pdf;base64,${response.finalString}`;
            const link = document.createElement('a');
            link.href = source;
            link.download = `ventaProducto.pdf`;
            link.click();
            setTimeout(() => {
              location.reload();
            }, 100);
          });
      });
    } else {
      this.cargados = false;
    }
  }
}
