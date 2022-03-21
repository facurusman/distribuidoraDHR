import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sale } from 'src/app/models/sale';
import { SalesService } from 'src/app/services/sales.service';

export interface PeriodicElement {
  name: string;
  total: number;
  date: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {name : "rusman", total : 1234, date: "aaa"},
  {name : "rusman", total : 1234, date: "aaa"},
  {name : "rusman", total : 1234, date: "aaa"},
  {name : "rusman", total : 1234, date: "aaa"},
  {name : "rusman", total : 1234, date: "aaa"},
  {name : "rusman", total : 1234, date: "aaa"},
  {name : "rusman", total : 1234, date: "aaa"},
  {name : "rusman", total : 1234, date: "aaa"},
  {name : "rusman", total : 1234, date: "aaa"},
  {name : "rusman", total : 1234, date: "aaa"},
];


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements AfterViewInit {
  displayedColumns: string[] = [ 'nombre', 'total', 'fecha'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  name:any
  total:any
  date:any
  constructor(private readonly salesService: SalesService) {}

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  allProducts() {
    this.salesService.getSales().subscribe( (response) => {
     console.log(response)
    })
  }

  onCreateProduct() {
    const sale = new Sale({
      name:this.name,
      total:this.total,
      date:this.date
    });
    this.salesService.postSale(sale).subscribe((response) => {
      location.reload();
      console.log(response);
    });
  }
}
