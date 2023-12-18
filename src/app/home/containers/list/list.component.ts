import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableColumnType } from 'src/app/shared/enums';
import { PaginatorMode, TableProperties } from 'src/app/shared/models';
import { FormControllerService } from 'src/app/shared/modules/api-client/api/api';
import { FormStates } from 'src/app/shared/enums';
import { FormFilter1, Form } from 'src/app/shared/modules/api-client/model/models';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { HeaderService, IHeaderParam } from 'src/app/shared/services/header.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  dataSource$: BehaviorSubject<Form[]>;
  genericTable: TableProperties;
  filter: FormFilter1 = {
    limit: 10,
    offset: 0
  };
  selectValues = [
    { value: 'project', viewValue: 'Proyecto' },
    { value: 'salesOrder', viewValue: 'Pedido' },
    { value: 'customer', viewValue: 'Cliente' },
  ];

  constructor(
    private formControllerService: FormControllerService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
  ) {
    this.dataSource$ = new BehaviorSubject([]);
  }

  async ngOnInit() {

    const params: IHeaderParam[] = [{
      label: 'Lista Pautas BSI',
    }];
    this.headerService.setParams(params);

    this.filter = {
      limit: 10,
      offset: 0,
      where: {
        status: { eq: FormStates.finalizado }
      }
    };

    const pageCount = await this.getPageCount();

    this.genericTable = {

      displayedColumns: [
        'project', 'salesOrder', 'customer', 'status', 'startDate', 'serialNumber', 'actions'
      ],
      columnProperties: [
        { name: 'project', noSort: true },
        { name: 'salesOrder', noSort: true },
        { name: 'customer', noSort: true },
        { name: 'status', noSort: true },
        { name: 'startDate', noSort: true, type: TableColumnType.date },
        { name: 'serialNumber', noSort: true },
        { name: 'actions', type: TableColumnType.actions }
      ],
      properties: { actions: 'actions' },
      pageSize: 10,
      length: pageCount.count,
      paginatorMode: PaginatorMode.Default
    };
    this.getFormularios();
  }

  getFormularios() {
    this.formControllerService.formControllerFind(this.filter)

      .subscribe(response => {
        this.dataSource$.next(response);
      });
  }

  onSearch(event: { value: string, field: string }) {
    const pattern =  event.value;

    this.filter.where =
    {
      and: [
        { status: { eq: FormStates.finalizado } }, { [event.field]: { like: pattern, options: 'i' } }
      ]
    };
    this.getFormularios();
  }


  async getPageCount() {
    return this.formControllerService.formControllerCount(this.filter.where).toPromise();
  }

  handlerPaginator(eventPaginator: PageEvent): void {
    this.filter.skip = eventPaginator.pageIndex * this.filter.limit;
    this.getFormularios();
  }


  continueSelectedForm(element: Form) {
    // this.router.navigate(['form', {id: element.id, state: 'view'}]);
    this.router.navigate(['form', element.id, 'view']);
    // this.router.navigate(`form/$element.id/view`);
      // ['form', id: element.id, state: 'view' ]);

  }


  goBack() {
    this.router.navigate(['/home']);

  }

  ngOnDestroy(){
    this.headerService.clearParams();
  }

}
