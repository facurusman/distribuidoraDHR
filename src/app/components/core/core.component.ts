import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  @Output() public sidenavToggle = new EventEmitter();
  rol :any = localStorage.getItem('rol')
  constructor(private router: Router, private authService: AuthService) { }

  @ViewChild("sidenav")
  sidenav?: MatSidenav;
  ngOnInit(): void { }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  goToStatisticsPage() {
    this.sidenav?.toggle();
    this.router.navigateByUrl('/dyg/estadisticas');
  }
  goToHomePage() {
    this.sidenav?.toggle();
    this.router.navigateByUrl('/dyg/home');
  }

  goToClientsPage() {
    this.sidenav?.toggle();
    this.router.navigateByUrl('/dyg/clients');
  }

  goToProductsPage() {
    this.sidenav?.toggle();
    this.router.navigateByUrl('/dyg/products');
  }

  goToSalesPage() {
    this.sidenav?.toggle();
    this.router.navigateByUrl('/dyg/sales');
  }

  goToUsersPage() {
    this.sidenav?.toggle();
    this.router.navigateByUrl('/dyg/usuarios');
  }

  logout() {
    this.authService.logout();
  }
}
