import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { ErroresComponent } from './components/errores/errores.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { ProductsComponent } from './components/products/products.component';
import { SalesComponent } from './components/sales/sales.component';
import { LoginComponent } from './components/login/login.component';
import { SideBarComponent } from './components/sidebar/sidebar.component';
import { CoreComponent } from './components/core/core.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dhr',
    component: CoreComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import("../../src/app/components/home-component/home-component.component").then(m => m.HomeComponentComponent)
      },
      {
        path: 'clientes',
        loadChildren: () => import("../../src/app/components/clients/clients.component").then(m => m.ClientsComponent)
      },
      {
        path: 'productos',
        loadChildren: () => import("../../src/app/components/products/products.component").then(m => m.ProductsComponent)
      },
      {
        path: 'ventas',
        loadChildren: () => import("../../src/app/components/sales/sales.component").then(m => m.SalesComponent)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
