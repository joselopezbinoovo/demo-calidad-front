import {
  Component,
  OnInit,
  TemplateRef,
  Input,
  ViewChild,
  OnDestroy,
  Output,
  EventEmitter,
  OnChanges,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { TableProperties, PaginatorMode } from '../../models';
import { TableGenericTemplate } from './table-generic-template.directive';
import { DateService } from 'src/app/shared/services/date.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { FilterService } from '../../services/filter.service';


@Component({
  selector: 'app-table-generic',
  templateUrl: './table-generic.component.html',
  styleUrls: ['./table-generic.component.scss']
})
export class TableGenericComponent implements OnInit, AfterContentInit, OnDestroy, OnDestroy, OnChanges {

  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() @ViewChild('table1') table1: MatTable<any>;
  @Output() eventTableClick =  new EventEmitter(false);
  @Output() eventPaginator = new EventEmitter();
  @Output() eventSortChange = new EventEmitter();
  @Output() eventSelection: EventEmitter<any> = new EventEmitter();
  @Output() eventTableRowChange: EventEmitter<any> = new EventEmitter();
  @Output() eventShowMore = new EventEmitter();

  @Input() dataSource: any;
  @Input() dataSource$: any;
  @Input() tableProperties: TableProperties;
  @Input() templateRef: TemplateRef<any>;
  @Input() highlight: string;
  @Input() busy: boolean;

  @Input() eventInput = new BehaviorSubject(null);
  @ContentChildren(TableGenericTemplate) templates: QueryList<TableGenericTemplate>;

  footerTemplate: TemplateRef<any>;


  showComponent = false;
  unloadSubscription: Subscription;
  showActions = false;
  dataSourceT: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  sortedData: any[];
  selection: SelectionModel<any> = new SelectionModel<any>(true, []);
  selectionSubscription$: Subscription;
  shownHeaderGroups: string[] = [];
  shownFooterColumns: string[] = [];
  eventInputSubscription$: Subscription;

  constructor(
    private dateService: DateService,
    private filterService: FilterService
  ) {
  }

  ngOnInit(): void {
    this.dataSourceT.paginator = this.paginator;
    this.dataSourceT.sort = this.sort;
    this.handlerDataSource();
    this.selectionSubscription$ = this.selection.changed.subscribe(_ => {
      const selectedData = { count: this.selection.selected.length, data: _.added[0], remove: _.removed[0] };
      this.eventSelection.emit(selectedData);
    });

    this.eventInputSubscription$ =  this.eventInput.subscribe((res) => {
        if (res && res.index) {
          this.dataSourceT.data[res.index] = res.record;
        }
    });

  }

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'footer':
          this.footerTemplate = item.template;
          break;
      }
    });
  }

  handlerDataSource(): void {
    if (!!this.dataSource$) {
      this.unloadSubscription = this.dataSource$.subscribe(respUnload => {
        if (!Array.isArray(respUnload)) {
          respUnload = [respUnload];
        }
        this.getColumnsName(respUnload[0]?.data || []);
        // this.dataSourceT = new MatTableDataSource<any>(respUnload[0]?.data || []);
        // this.dataSourceT.paginator = this.paginator;
        this.dataSourceT.data = respUnload[0]?.data || [];
        this.showComponent = true;

      });
    }

    if (!!this.dataSource) {
      if (Array.isArray(this.dataSource)) {
        this.getColumnsName(this.dataSource);
        this.dataSourceT.data = this.dataSource;

        this.showComponent = true;
      }
    }

    if (!this.dataSourceT && !this.tableProperties.length) {
      this.showComponent = true;
    }

  }

  private getColumnsName(ds): void {
    if (ds !== undefined && ds !== null) {
      if (this.tableProperties.displayedColumns === undefined || this.tableProperties.displayedColumns === null) {
        this.tableProperties.displayedColumns = Object.keys(ds[0]);
        if (this.templateRef) {
          this.tableProperties.displayedColumns.push('actions');
        }
      } else if (this.tableProperties.properties) {
        this.showActions = this.tableProperties.displayedColumns.includes(this.tableProperties.properties.actions);
      }
    } else {
      this.showComponent = false;
    }
  }

  ngOnChanges(changes) {
    this.filterService.stateChanged.subscribe((state: any) => {
      if(state){
        this.paginator.firstPage()
        this.filterService.stateChanged.next(false)
      }
    })
  
    if (changes.tableProperties) {
      this.shownHeaderGroups = this.tableProperties.headerGroups ? this.tableProperties.headerGroups.map(g => g.key) : [];
      const { previousValue, currentValue } = changes.tableProperties;
      if (this.paginator && previousValue?.length !== currentValue?.length) {
        this.paginator.pageIndex = 0
      }
    }

    if (!!changes.dataSource || !!changes.dataSource$) {
      this.handlerDataSource();
    }

  }

  ngOnDestroy(): void {
    if (!!this.unloadSubscription) { this.unloadSubscription.unsubscribe(); }
    if (!!this.selectionSubscription$) { this.selectionSubscription$.unsubscribe(); }
    if (!!this.eventInputSubscription$){ this.eventInputSubscription$.unsubscribe(); }
  }

  eventPage(eventPage): void {
    console.log(eventPage);
    
    this.eventPaginator.emit(eventPage);
  }

  eventSort(eventSort): void {
    console.log(eventSort);

    this.paginator.pageIndex = 0;
    this.eventSortChange.emit(eventSort);
  }

  showMore() {
   this.eventShowMore.emit();
  }

  canShowMore() {

    console.log(this.tableProperties.length);

    return this.tableProperties.shownRecords < this.tableProperties.length;



  }

  sortData(sort: any) {

    const data = this.dataSourceT.data.slice();

    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return this.compare(a[sort.active], b[sort.active], isAsc);
    });
    // this.dataSourceT = new MatTableDataSource<any>(this.sortedData);
    this.dataSourceT.data = this.sortedData;
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  selectCSS(property, value: string): string {
    const { options } = property;
    const classCSS = [];

    if (options) {
      const selectedOption = options?.find(option => option.name === value);
      if (selectedOption) {
        classCSS.push(selectedOption.class);
      }
    }

    if (!this.tableProperties.widthClass) {
      classCSS.push(' mw-40');
    } else {
      classCSS.push(' mw-100');
    }

    return classCSS.join(' ');
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceT.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSourceT.data.forEach(row => {
        this.selection.select(row);
      });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


   clickRowChanged(event, record, rowIndex, property, column, columnIndex){

    if (!record.selects.length || record.selects.length === 1) {

      this.eventTableClick.emit({event, record, rowIndex, property, column, columnIndex});
    }else{

      record.selects = event.target.value;
      const previousValue = record[column.name];
      record[column.name] = [event.target.value];
      const eventTableRow = {
          action: 'inputChanged',
          payload: {
            previousValue,
            newValue: [event.target.value],
            data: record,
            field: property.name,
            rowIndex,
            column,
            columnIndex
          }
      };
      this.eventTableRowChange.emit(eventTableRow);
    }

  }


  public raiseRowChanged(value, record, rowIndex, property, column, columnIndex): void {

    record.selects = value.target.value;
    this.dataSourceT.data.splice(columnIndex, record, record);

    const previousValue = record[column.name];
    record[column.name] = [value.target.value];

    const eventTableRow = {
      action: 'inputChanged',
      payload: {
        previousValue,
        newValue: [value.target.value],
        data: record,
        field: property.name,
        rowIndex,
        column,
        columnIndex
      }
    };

    this.eventTableRowChange.emit(eventTableRow);

  }

  hours(isoString: string): string {
    const tEpoch = this.dateService.getTimeFromEpoch(isoString) / 1000;
    return `${this.dateService.secondsToString(tEpoch)}`;
  }

  hasPermissions(): boolean{
    const ls = JSON.parse(localStorage.getItem('user'));
    const department = ls.x_department_id;
    return [3, 31].includes(department) ? true : false
  }

  canEdit(){
    if(this.dataSource === 'Finalizado' && !this.hasPermissions()){
      return false
    }else{
      return true
    }
  }

}
