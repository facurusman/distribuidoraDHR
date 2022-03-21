import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { ErroresComponent } from './components/errores/errores.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { ProductsComponent } from './components/products/products.component';
import { SalesComponent } from './components/sales/sales.component';
import { LoginComponent } from './components/login/login.component';
import { SideBarComponent } from './components/sidebar/sidebar.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponentComponent },
  { path: 'clientes', component: ClientsComponent },
  { path: 'productos', component: ProductsComponent },
  { path: 'ventas', component: SalesComponent },
  { path: 'dashboard', component: SideBarComponent },
  { path: '**', component: ErroresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
