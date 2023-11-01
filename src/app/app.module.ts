import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { VerifyComponent } from './component/verify/verify.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import {FormsModule} from "@angular/forms";
import { ProfileComponent } from './component/profile/profile.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { StatsComponent } from './component/stats/stats.component';
import {TokenInterceptor} from "./interceptor/token.interceptor";
import { CustomerComponent } from './component/customer/customer.component';
import { CustomersComponent } from './component/customers/customers.component';
import { NewCustomerComponent } from './component/new-customer/new-customer.component';
import { InvoicesComponent } from './component/invoices/invoices.component';
import { NewInvoiceComponent } from './component/new-invoice/new-invoice.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { ExtractArrayValue } from './pipes/extractvalue.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    VerifyComponent,
    ResetpasswordComponent,
    CustomerComponent,
    ProfileComponent,
    HomeComponent,
    NavbarComponent,
    StatsComponent,
    CustomersComponent,
    NewCustomerComponent,
    InvoicesComponent,
    NewInvoiceComponent,
    InvoiceComponent,
    ExtractArrayValue
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
