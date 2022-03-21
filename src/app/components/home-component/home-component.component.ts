import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss'],
})
export class HomeComponentComponent implements OnInit {
  constructor(private router:Router) {}

  ngOnInit(): void {}

  onClient(){
    this.router.navigateByUrl('/clientes');
  }
  onProduct(){
    this.router.navigateByUrl('/productos');
  }
  onSale(){
    this.router.navigateByUrl('/ventas');
  }
}
