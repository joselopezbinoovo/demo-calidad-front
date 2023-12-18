import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../../app-material.module';

import { DialogComponent } from './dialog/dialog.component';
import { SearcherComponent } from './searcher/searcher.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { MatSelectModule } from '@angular/material/select';

import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [HeaderComponent, DialogComponent, SearcherComponent, ImageUploadComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSelectModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
    })

  ],
  exports: [
    HeaderComponent,
    DialogComponent,
    SearcherComponent,
    ImageUploadComponent,
    ToastrModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule { }
