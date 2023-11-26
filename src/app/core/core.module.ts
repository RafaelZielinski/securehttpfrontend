import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { CasheInterceptor } from '../interceptor/cache.interceptor';
import { TokenInterceptor } from '../interceptor/token.interceptor';
import { HttpCacheService } from '../service/http.cache.service';
import { CustomerService } from '../service/customer.service';
import { UserService } from '../service/user.service';
import { NotificationService } from '../service/notification.service';

@NgModule({
    imports: [ HttpClientModule],
    providers: [
        UserService, CustomerService, HttpCacheService, NotificationService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: CasheInterceptor, multi: true }]
})
export class CoreModule { }
