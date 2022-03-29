import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { ErroresComponent } from './components/errores/errores.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { ProductsComponent } from './components/products/products.component';
import { SalesComponent } from './components/sales/sales.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CoreComponent } from './components/core/core.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuard } from './components/auth/login/auth.guard';
const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dhr',
    component: CoreComponent,
    children: [
      { path: 'home', component: HomeComponentComponent  },
      { path: 'clients', component: ClientsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'sales', component: SalesComponent  },
    ],
  },
  {path:'signup', component: SignupComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
