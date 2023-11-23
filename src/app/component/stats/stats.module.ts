import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavBarModule } from '../navbar/navbar.module';
import { StatsComponent } from './stats.component';



@NgModule({
    declarations: [StatsComponent],
    imports: [SharedModule],
    exports: [StatsComponent]
})
export class StatsModule { }
