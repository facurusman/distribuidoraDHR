import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToHomePage(){
    this.router.navigateByUrl('/dhr/home');
  }

  goToClientsPage() {
    this.router.navigateByUrl('/dhr/clients');
  }

  goToProductsPage() {
    this.router.navigateByUrl('/dhr/products');
  }

  goToSalesPage() {
    this.router.navigateByUrl('/dhr/sales');
  }

  logout() {
    this.router.navigateByUrl('/');
  }
}
