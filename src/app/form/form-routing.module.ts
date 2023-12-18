import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './containers/form/form.component';
import { ImagesComponent } from './containers/images/images.component';
import { ConfigComponent } from './containers/config/config.component';


const routes: Routes = [
  { path: '', component: FormComponent },
  { path: ':id/:state', component: FormComponent },
  { path: 'images', component: ImagesComponent},
  { path: ':id/:state/images/:id/:index', component: ImagesComponent },
  { path: 'config', component: ConfigComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
