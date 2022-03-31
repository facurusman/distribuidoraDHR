import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { ErroresComponent } from './components/errores/errores.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { ProductsComponent } from './components/products/products.component';
import { SalesComponent } from './components/sales/sales.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CoreComponent } from './components/core/core.component';
import { EditComponent } from './components/edit/edit.component';
import { AuthGuard } from './components/auth/login/auth.guard';
import { ProductClientComponent } from './components/product-client/product-client.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dhr',
    component: CoreComponent,
    children: [
      { path: 'home', component: HomeComponentComponent  },
      { path: 'clients', component: ClientsComponent },
      { path: 'productsClient', component: ProductClientComponent },
      { path: 'edit', component: EditComponent  },
      { path: 'products', component: ProductsComponent },
      { path: 'sales', component: SalesComponent  },
    ],
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
