import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { MasterFormControllerService } from 'src/app/shared/modules/api-client/api/api';
import { MasterFormFilter1, MasterFormWithRelations } from 'src/app/shared/modules/api-client/model/models';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  masterFormTypes: MasterFormWithRelations[];
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private storageService: StorageService,
    private masterFormControllerService: MasterFormControllerService) { }

  ngOnInit(): void {
  }

  createForm(){
    const filter: MasterFormFilter1 = {
      fields : {
        id: false,
        name: false,
        type: true,
        section: false,
        blocks: false
      }
    };
    this.masterFormControllerService.masterFormControllerFind(filter).subscribe((resTypes) => {
      this.masterFormTypes = resTypes;
      this.dialog.open(DialogComponent, {
        width: '500px',
        height: '500px',
        data: {
          title: 'PUESTO DE TRABAJO',
          type: 'form',
          inputs : resTypes
        },
        panelClass: 'dialogHome'
      }).afterClosed().subscribe((resData) => {
        if (resData) {
          this.storageService.setSelectedFormType(resData);
          this.router.navigate(['home/list/cuadros']);
        }
      });
    }, ( err: HttpErrorResponse) => {
      console.error(err);
      throw new Error(err.message);
   });


  }

}
