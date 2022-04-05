import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  id: number = 0;
  descripcion: string = "";
  precio_base: number = 0;

  constructor(private readonly productService :ProductsService, private readonly router : Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProduct(this.id).subscribe( (response: any) => {
      this.descripcion = response.descripcion;
      this.precio_base = response.precio_base;
      //otrod
     })
  }
  onEdit(){
    const product = new Product({
      descripcion : this.descripcion,
      precio_base : this.precio_base,
    });
    this.productService.editProduct(product, this.id ).subscribe((response) => {
      return response
    });
  }
}
