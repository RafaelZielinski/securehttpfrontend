import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './component/auth/auth.module';

import { CustomerModule } from './component/customer/customer.module';
import { HomeModule } from './component/home/home.module';
import { InvoiceModule } from './component/invoice/invoice-module';
import { UserModule } from './component/profile/user.module';
import { TestsComponent } from './component/tests/tests.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    TestsComponent
    ],
  imports: [
    BrowserModule,
    
    HttpClientModule,
    CoreModule,
    SharedModule,
    AuthModule,
    CustomerModule,
    HomeModule,
    InvoiceModule,
    
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
