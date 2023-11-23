import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NavBarModule } from '../navbar/navbar.module';

@NgModule({
    declarations: [ InvoicesComponent, NewInvoiceComponent, InvoiceDetailComponent,],
    imports: [ SharedModule, InvoiceRoutingModule, NavBarModule ]
})
export class InvoiceModule { }
