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
import { ActivatedRoute, Router } from '@angular/router';
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
  selection = new SelectionModel<SaleData>(true, []);
  dataSourceVentas = new MatTableDataSource<SaleData>();
  displayedColumnsVentas: string[] = ['id', 'idCliente', 'fecha', 'total'];
  @ViewChild('TableVentasSort', {static: true}) tableVentasSort: MatSort;
  @ViewChild('TableVentasPaginator', {static: true}) tableVentasPaginator: MatPaginator;


  fecha_inicial: any
  fecha_final: any
  id: number = 0

  constructor(
    private readonly saleService: SalesService,
    private readonly productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private pdfService: PDFService,
    private readonly clientService: ClientsService) {
    this.id = this.route.snapshot.params['id'];
    // Assign the data to the data source for the table to render
    this.dataSourceVentas = new MatTableDataSource();
    this.getSales()
  }


  matcher = new MyErrorStateMatcher();
  ngOnInit() {
    this.dataSourceVentas.paginator = this.tableVentasPaginator;
    this.dataSourceVentas.sort = this.tableVentasSort;
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

  generarPDF() {
      this.pdfService.generarPDFVentas().subscribe((response: any) => {
      const source = `data:application/pdf;base64,${response.finalString}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `ventas.pdf`;
      link.click();
    });;
  }

  gotoCreateSale() {
    this.router.navigateByUrl('/sales/crear');
  }

}
