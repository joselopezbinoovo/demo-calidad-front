import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { FormControllerService, MasterFormControllerService, CustomDataControllerService } from 'src/app/shared/modules/api-client/api/api';
import { CustomDataFilter1, Form, FormBlock, MasterFormFilter1 } from 'src/app/shared/modules/api-client/model/models';
import { Router } from '@angular/router';
import { FormStates } from 'src/app/shared/enums';
import { MsgboxService } from 'src/app/shared/services/msgbox.service';
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
interface ImodalData  {
  title: string;
  type: string;
  inputs?: any;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  type: string;
  objForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ImodalData,
    private router: Router,
    private customDataControllerService: CustomDataControllerService,
    private masterFormControllerService: MasterFormControllerService,
    private msgboxService: MsgboxService,
    private formControllerService: FormControllerService,
    public dialogRef: MatDialogRef<DialogComponent>){  }
  // salesOrder: new FormControl(this.data.inputs.x_client_ref, { validators: [Validators.required] }),

  ngOnInit(): void {
    if (this.data.type === 'pauta') {
      this.objForm =  new FormGroup({
        project: new FormControl(this.data.inputs.x_brand_code , { validators: [ Validators.required] }),
        salesOrder: new FormControl(this.data.inputs.x_client_ref),
        client: new FormControl(this.data.inputs.x_name_0, { validators: [ Validators.required] }),
        product: new FormControl(this.data.inputs.x_name , { validators: [ Validators.required] }),
      });
    }
  }

  startMasterForm(){
    if (this.objForm.valid) {
      const masterFormFilter: MasterFormFilter1 = {
        where: {
          type: {
            eq: this.data.inputs.x_name_2
          }
        }
      };
      const customKeys = [];
      this.masterFormControllerService.masterFormControllerFind(masterFormFilter).subscribe((resMasterForm) => {
        // resMasterForm[0].blocks.map((block) => {
        //   block.inputs.map((input) => {
        //     if (!customKeys.includes(input.selects[0])) {
        //       customKeys.push(input.selects[0]);
        //     }
        //     // input.selects = [];
        //   });
        // });

        if (resMasterForm.length) {

          const formBody: Form = {
            status: FormStates.creado,
            project: this.data.inputs.x_brand_code,
            personInCharge: this.data.inputs.x_name_1,
            customer: this.data.inputs.x_name_0,
            salesOrder: this.data.inputs.x_client_ref || '',
            item: this.data.inputs.x_name,
            serialNumber: this.data.inputs.x_client_order_ref || '-',
            section: resMasterForm[0].section,
            type: resMasterForm[0].type,
            blocks: resMasterForm[0].blocks as FormBlock[],
            startDate: new Date().toISOString(),
            xBveFormulariosId: this.data.inputs.x_name_4,
          };

          this.formControllerService.formControllerCreate(formBody).subscribe(
            (resForm) => {
              this.router.navigate(['/form', resForm.id, 'edit']);
              this.dialogRef.close();
            }
          );

        } else {
          console.log('formularios maestro no encontrado!');
          this.msgboxService.showWarning('Formulario Maestro no encontrado!');
        }
      });

    } else {
      this.msgboxService.showWarning('Campos requeridos');

    }

  }

  closeModal(){
    this.dialogRef.close();
  }

  handleSubmit(){
    this.dialogRef.close(this.type);
  }
  confirmDelete(){
    this.dialogRef.close(true);
  }
}
