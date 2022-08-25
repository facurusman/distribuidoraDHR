import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import {
  EliminarDialogoProducts,
  ProductsComponent
} from './components/products/products.component';
import { SalesComponent } from './components/sales/sales.component';
import { ClientsComponent, EliminarDialogo } from './components/clients/clients.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ClientsService } from './services/clients.service';
import { ProductsService } from './services/products.service';
import { SalesService } from './services/sales.service';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { ErroresComponent } from './components/errores/errores.component';
import { CoreComponent } from './components/core/core.component';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { ProductClientComponent } from './components/product-client/product-client.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { PDFService } from './services/pdf.service';
import { DatePipe } from '@angular/common';
import { ProductSalesComponent } from './components/product-sales/product-sales.component';
import {
  EliminarDialogoUsuarios,
  UsuariosComponent
} from './components/usuarios/usuarios.component';
import { EditUsuariosComponent } from './components/edit-usuarios/edit-usuarios.component';
import { EliminarDialogoListas, ListasComponent } from './components/listas/listas.component';
import { EditListComponent } from './components/edit-list/edit-list.component';
import { GraphicsService } from './services/graphics.service';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    SalesComponent,
    ClientsComponent,
    LoginComponent,
    HomeComponentComponent,
    ErroresComponent,
    CoreComponent,
    EditClientComponent,
    ProductClientComponent,
    EditProductComponent,
    EliminarDialogo,
    EliminarDialogoProducts,
    ProductSalesComponent,
    UsuariosComponent,
    EliminarDialogoUsuarios,
    EditUsuariosComponent,
    ListasComponent,
    EliminarDialogoListas,
    EditListComponent
  ],
  imports: [
    NgChartsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    NgApexchartsModule,
  ],
  exports: [RouterModule],
  providers: [
    ClientsService,
    UsersService,
    ProductsService,
    SalesService,
    AuthService,
    PDFService,
    GraphicsService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
