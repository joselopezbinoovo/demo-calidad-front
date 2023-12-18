import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './containers/form/form.component';
import { MaterialModule } from 'src/app/app-material.module'
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { BlocksComponent } from './components/blocks/blocks.component';
import { SharedModule  } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ImagesComponent } from './containers/images/images.component';
import { ModalImageComponent } from './components/modal-image/modal-image.component';
import { ConfigComponent } from './containers/config/config.component';
import { MatChipsModule } from '@angular/material/chips';
import { ModalSignatureComponent } from './components/modal-signature/modal-signature.component';
import { ModalSelectLanguageComponent } from './components/modal-select-language/modal-select-language.component';
@NgModule({
  declarations: [FormComponent, BlocksComponent, ImagesComponent, ModalImageComponent, ConfigComponent, ModalSignatureComponent, ModalSelectLanguageComponent],
  imports: [
    CommonModule,
    FormRoutingModule,
    MaterialModule,
    MatStepperModule,
    ReactiveFormsModule,
    SharedModule,
    ComponentsModule,
    MatChipsModule
  ]
})
export class FormModule { }
