import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { ErroresComponent } from './components/errores/errores.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { ProductsComponent } from './components/products/products.component';
import { SalesComponent } from './components/sales/sales.component';

const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'clientes', component: ClientsComponent },
  { path: 'productos', component:ProductsComponent },
  { path: 'ventas', component: SalesComponent },
  { path: '**', component: ErroresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
