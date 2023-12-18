import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableProperties } from 'src/app/shared/models';
import { TableColumnType } from 'src/app/shared/enums';
import { FormControllerService } from 'src/app/shared/modules/api-client/api/api';
import { FormFilter1, Form } from 'src/app/shared/modules/api-client/model/models';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormStates } from 'src/app/shared/enums';
import { Location } from '@angular/common';
import { HeaderService, IHeaderParam } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-inspection-list',
  templateUrl: './inspection-list.component.html',
  styleUrls: ['./inspection-list.component.scss']
})
export class InspectionListComponent implements OnInit, OnDestroy {
  dataSource$: BehaviorSubject<Form[]>;
  genericTable: TableProperties;
  filter: FormFilter1;

  constructor(
    private formControllerService: FormControllerService,
    private location: Location,
    private headerService: HeaderService,
    private router: Router,
    private route: ActivatedRoute) {
    this.dataSource$ = new BehaviorSubject([]);
  }

  ngOnInit(): void {
    const params = [{
      label: 'Formularios',
    }];
    this.headerService.setParams(params);

    this.genericTable = {
      displayedColumns: [
        'project', 'salesOrder', 'customer', 'status', 'startDate', 'serialNumber', 'actions'
      ],
      columnProperties: [
        { name: 'project', noSort: true },
        { name: 'salesOrder', noSort: true },
        { name: 'customer', noSort: true },
        { name: 'status', noSort: true },
        { name: 'startDate', noSort: true },
        { name: 'serialNumber', noSort: true },
        { name: 'actions', type: TableColumnType.actions }
      ],
      properties: { actions: 'actions' }
    };
    this.getFormularios();
  }

  getFormularios(){
    this.filter = {
      where: {
        and: [{xBveFormulariosId:  this.route.snapshot.params.id    }, {status:  { neq : FormStates.finalizado }}]
      }
    };
    this.formControllerService.formControllerFind(this.filter)
   .subscribe(response => {
      this.dataSource$.next(response);
   });
  }

  continueSelectedForm(element: Form){
    this.router.navigate(['form', element.id, 'edit']);
  }

  goBack(){
    this.location.back();
  }

  ngOnDestroy(){
    this.headerService.clearParams();
  }

}
