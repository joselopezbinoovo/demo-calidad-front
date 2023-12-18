import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomDataControllerService } from 'src/app/shared/modules/api-client/api/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { CustomData, CustomDataPartial } from 'src/app/shared/modules/api-client/model/models';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  selectedFormId: string;
  formObj: FormGroup;
  items: CustomData[];
  newKey = {
    key : '',
    values : []
  };
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private customDataControllerService: CustomDataControllerService,
    private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.selectedFormId = this.route.snapshot.params.id;
    this.formObj = new FormGroup({
      key: new FormControl('', { validators: [Validators.required] }),
    });
    this.getChips();
  }

  getChips(){
    this.customDataControllerService.customDataControllerFind().subscribe((resData) => {
      this.items = resData;
    })
  }

  removeChip(i: number, e: string, a: any) {
    a.splice(i,1);
  }

  addChip(c: string, a: any) {
    const exists = a.find( i => i === c);
    if (!exists) { 
      a.push(c);
    }
  }

  deleteKey(key: CustomData){
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{
        title: 'Desea borrar la llave?',
        type: 'delete',
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.customDataControllerService.customDataControllerDeleteById(key.id).subscribe(() => {
          this.getChips();
        });
      }
    });
  }

  saveHandler(key: CustomData){
      this.customDataControllerService.customDataControllerUpdateById(key.id, key).subscribe(() => {
        const dialogRef = this.dialog.open(DialogComponent,{
          data:{
            title: 'Valores Guardados con Éxito!',
            type: 'success',
          }
        });
      });
  }

  saveKeyHandler(){
    this.newKey.key = this.formObj.value.key;
    this.customDataControllerService.customDataControllerCreate(this.newKey).subscribe(() => {
      this.getChips();
    })
  }

  goBack() {
    // this.router.navigate(['form', { id: this.selectedFormId }]);
    this.router.navigate(['home']);
  }

}
