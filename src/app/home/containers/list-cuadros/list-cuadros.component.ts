import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableColumnType } from 'src/app/shared/enums';
import { PaginatorMode, TableProperties } from 'src/app/shared/models';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from 'src/app/shared/services/storage.service';
import {
  XBveFormulariosControllerService,
  FormControllerService,
} from 'src/app/shared/modules/api-client/api/api';
import {
  XBveFormulariosFilter1,
  XBveFormulariosPartial,
  XBveFormularios,
} from 'src/app/shared/modules/api-client/model/models';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { FormStates, XbeFormStates } from 'src/app/shared/enums';
import {
  HeaderService,
  IHeaderParam,
} from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-list-cuadros',
  templateUrl: './list-cuadros.component.html',
  styleUrls: ['./list-cuadros.component.scss'],
})
export class ListCuadrosComponent implements OnInit, OnDestroy {
  dataSource: XBveFormulariosPartial[];
  genericTable: TableProperties;
  selectedFormType: string;
  filter: XBveFormulariosFilter1;
  params;
  state: string =  'confirmed';
  selectValues = [
    { value: 'x_brand_code', viewValue: 'Proyecto' },
    { value: 'x_name', viewValue: 'Producto' },
  ];

  constructor(
    private dialog: MatDialog,
    private storageService: StorageService,
    private router: Router,
    private headerService: HeaderService,
    private xBveFormulariosControllerService: XBveFormulariosControllerService,
    private formControllerService: FormControllerService
  ) {}

  async ngOnInit() {
    this.selectedFormType = this.storageService.getSelectedFormType();

    let params: IHeaderParam[] = [
      {
        label: 'Lista Cuadros BSI',
        value: this.selectedFormType,
      },
    ];
    this.headerService.setParams(params);

    this.filter = {
      limit: 10,
      offset: 0,
      where: {
        and: [
          { x_name_2: { eq: this.selectedFormType } },
          {
            and: [
              { x_state: { neq: XbeFormStates.done } },
              { x_state: { neq: XbeFormStates.cancelled } },
            ],
          },
        ],
      },
    };
    const pageCount = await this.getPageCount();


    this.genericTable = {
      displayedColumns: [
        'x_brand_code',
        'x_name_0',
        'x_state',
        'x_name',
        'x_product_qty',
        'formularios',
        'actions',
      ],
      columnProperties: [
        { name: 'x_brand_code', noSort: true },
        { name: 'x_name_0', noSort: true },
        { name: 'x_state', noSort: true },
        { name: 'x_name', noSort: true },
        { name: 'x_product_qty', noSort: true },
        { name: 'formularios', noSort: true },
        { name: 'actions', type: TableColumnType.actions },
      ],

      properties: { actions: 'actions' },
      pageSize: 10,
      length: pageCount.count,
      paginatorMode: PaginatorMode.Default,
    };


    this.getxBveFormularios();
  }

  getPageCount() {
    return this.xBveFormulariosControllerService.xBveFormulariosControllerCount(this.filter.where).toPromise();
  }

  getxBveFormularios() {
    this.xBveFormulariosControllerService
      .xBveFormulariosControllerFind(this.filter)
      .subscribe(
        (xBveformsResp) => {

          console.log(xBveformsResp);



          this.dataSource = [...xBveformsResp];

          this.dataSource.map((xBveformsResp) => {
            if (this.selectedFormType === 'INDUSTRIA - EQUIPOS') {
              xBveformsResp.x_product_qty = 1;
            }
            const filterFormulariosCount = {
              xBveFormulariosId: xBveformsResp.x_name_4 as unknown as object,
            };
            this.formControllerService
            .formControllerCount(filterFormulariosCount)
            .subscribe(
              (res) => {
                xBveformsResp['formularios'] = res.count;
              },
              (err: HttpErrorResponse) => {
                console.error(err);
              }
              );
            });
        },
        (err: HttpErrorResponse) => {
          console.error(err);
        }
      );
  }

  async onSearch(event: { value: string; field: string }) {
    const pattern = `%${event.value}%`;
    if (pattern.length > 2) {
      this.filter = {
        where: {
          and: [
            { x_name_2: { eq: this.selectedFormType } },
            { x_state: { nin: [XbeFormStates.cancelled] } },
            { [event.field]: { like: pattern, options: 'i' } },
          ],
        },
      };

    } else {
      this.filter = {
        limit: 10,
        offset: 0,
        where: {
          and: [
            { x_name_2: { eq: this.selectedFormType } },
            { x_state: { eq: this.state } },
            { x_state: { neq: XbeFormStates.cancelled } },

          ],
        },
      };
    }
    const pagecount = await this.getPageCount();
    this.genericTable.length = pagecount.count;
    this.getxBveFormularios();
  }

  //// State/////

  async onFilterState(event: { value: string; field: string }) {
    this.state = event.value;
    console.log(this.state);
    if ( this.state.length == 0){
      this.filter = {
        limit: 10,
        offset: 0,
        where: {
          and: [
            { x_name_2: { eq: this.selectedFormType } },
            {
              and: [
                { x_state: { neq: XbeFormStates.done } },
                { x_state: { neq: XbeFormStates.cancelled } },
              ],
            },
          ],
        },
      };
      const pageCount = await this.getPageCount();
      this.genericTable.length = pageCount.count;
      this.getxBveFormularios();
    }
    else{
      this.filter = {
        limit: 10,
        offset: 0,
        skip: 0,
        where: {
          and: [
            { x_name_2: { eq: this.selectedFormType } },
            { x_state: { eq: this.state } },
          ],
        },
      };
      const pagecount = await this.getPageCount();
      this.genericTable.length = pagecount.count;
      this.getxBveFormularios();
    }
  }

  handlerPaginator(eventPaginator: PageEvent): void {
    this.filter.skip = eventPaginator.pageIndex * this.filter.limit;
    this.getxBveFormularios();
  }

  viewInspectionList(element: XBveFormularios) {
    this.router.navigate(['/home/inspection-list', { id: element.x_name_4 }]);
  }

  handleSort(event) {}

  openModal(element: XBveFormularios) {
    const dialog = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        title: 'PAUTA CALIDAD',
        type: 'pauta',
        inputs: element,
      },
      panelClass: 'dialogHome',
    });
  }

  handleSearch(evt) {}

  goBack() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    this.headerService.clearParams();
  }
}
