import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { SideBarComponent } from './components/sidebar/sidebar.component';
import { ProductsComponent } from './components/products/products.component';
import { SalesComponent } from './components/sales/sales.component';
import { ClientsComponent } from './components/clients/clients.component';
import { LoginComponent } from './components/login/login.component';
import { ClientsService } from './services/clients.service';
import { LoginService } from './services/login.service';
import { ProductsService } from './services/products.service';
import { SalesService } from './services/sales.service';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { ErroresComponent } from './components/errores/errores.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    ProductsComponent,
    SalesComponent,
    ClientsComponent,
    LoginComponent,
    HomeComponentComponent,
    ErroresComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
  ],
  exports: [RouterModule],
  providers: [ClientsService, LoginService, ProductsService, SalesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
