import { NgModule , CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableGenericComponent } from 'src/app/shared/components/table-generic/table-generic.component';
import { HighlightPipe } from 'src/app/shared/pipes/highlight/highlight.pipe';
import { ChangeNameHeaderPipe } from 'src/app/shared/pipes/name-header-table/name-header-table.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertMessageComponent } from 'src/app/shared/components/alert-message/alert-message.component';
import { MaterialModule } from 'src/app/app-material.module';
@NgModule({
  declarations: [TableGenericComponent, HighlightPipe, ChangeNameHeaderPipe,AlertMessageComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MaterialModule,
  ],
  exports: [TableGenericComponent,MatCheckboxModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class SharedModule { }

