import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { ListComponent } from './containers/list/list.component';
import { ListCuadrosComponent } from './containers/list-cuadros/list-cuadros.component';
import { InspectionListComponent } from './containers/inspection-list/inspection-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path:  'list/cuadros', component: ListCuadrosComponent},
  { path:  'inspection-list', component: InspectionListComponent},
  { path:  'inspection-list/:id', component: InspectionListComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
