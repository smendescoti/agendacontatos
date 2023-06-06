import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/home/navbar/navbar.component';
import { LoginComponent } from './components/home/login/login.component';
import { RegisterComponent } from './components/home/register/register.component';
import { PasswordComponent } from './components/home/password/password.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { CadastrarContatosComponent } from './components/admin/cadastrar-contatos/cadastrar-contatos.component';
import { ConsultarContatosComponent } from './components/admin/consultar-contatos/consultar-contatos.component';
import { EditarContatosComponent } from './components/admin/editar-contatos/editar-contatos.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    PasswordComponent,
    DashboardComponent,
    CadastrarContatosComponent,
    ConsultarContatosComponent,
    EditarContatosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxPaginationModule,
    FilterPipeModule,
    ChartModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
