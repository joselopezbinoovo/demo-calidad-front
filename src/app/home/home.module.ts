import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './containers/home/home.component';
import { ListComponent } from './containers/list/list.component';
import { MaterialModule } from 'src/app/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../shared/components/components.module';
import { ListCuadrosComponent } from './containers/list-cuadros/list-cuadros.component';
import { InspectionListComponent } from './containers/inspection-list/inspection-list.component';
@NgModule({
  declarations: [HomeComponent, ListComponent, ListCuadrosComponent, InspectionListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    SharedModule,
    ComponentsModule
  ]
})
export class HomeModule { }
