import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';


export interface PeriodicElement {
  description: string;
  price: number;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {description : "rusman", price : 1234},
  {description : "rusman", price : 1234},
  {description : "rusman", price : 1234},
  {description : "rusman", price : 1234},
  {description : "rusman", price : 1234},
  {description : "rusman", price : 1234},
  {description : "rusman", price : 1234},
  {description : "rusman", price : 1234},
  {description : "rusman", price : 1234},
  {description : "rusman", price : 1234},
];


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements AfterViewInit {
  displayedColumns: string[] = [ 'descripcion', 'precio'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  description:any
  price:any

  constructor(private readonly productsService: ProductsService) {}

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  allProducts() {
    this.productsService.getProducts().subscribe( (response) => {
     console.log(response)
    })
  }

  onCreateProduct() {
    const product = new Product({
      description:this.description,
      price:this.price
    });
    this.productsService.postProduct(product).subscribe((response) => {
      location.reload();
      console.log(response);
    });
  }
}
