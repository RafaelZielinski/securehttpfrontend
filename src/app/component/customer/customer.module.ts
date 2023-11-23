import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerRoutingModule } from './customer.routing.module';
import { HomeComponent } from '../home/home/home.component';
import { NavBarModule } from '../navbar/navbar.module';
import { CustomersComponent } from './customers/customers.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

@NgModule({
    declarations: [CustomersComponent, NewCustomerComponent, CustomerDetailComponent],
    imports: [SharedModule, CustomerRoutingModule, NavBarModule]
})
export class CustomerModule { }
