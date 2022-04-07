import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { ErroresComponent } from './components/errores/errores.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { ProductsComponent } from './components/products/products.component';
import { SalesComponent } from './components/sales/sales.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CoreComponent } from './components/core/core.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { AuthGuard } from './components/auth/login/auth.guard';
import { ProductClientComponent } from './components/product-client/product-client.component';
import { AuthComponent } from './components/auth/auth.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'dhr',
    component: CoreComponent, canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponentComponent, canActivate: [AuthGuard] },
      { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
      { path: 'productsClient/:id', component: ProductClientComponent, canActivate: [AuthGuard] },
      { path: 'edit/client/:id', component: EditClientComponent, canActivate: [AuthGuard] },
      { path: 'edit/product/:id', component: EditProductComponent, canActivate: [AuthGuard] },
      { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
      { path: 'sales', component: SalesComponent, canActivate: [AuthGuard] },
      { path: 'sales/:id', component: SalesComponent, canActivate: [AuthGuard] },
    ],
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
``
