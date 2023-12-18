import { TableColumnType, TableInputType } from '../enums';

export interface TableOptionProperties {
  name: any;
  value: any;
  class?: string;
}

export interface TableInputProperties {
  type?: TableInputType;
  step?: string;
  min?: number;
  max?: number;
}

export interface TableColunnProperties {
  name: string;
  type?: TableColumnType;
  inputProperties?: TableInputProperties;
  action?: string;
  isEditable?: boolean;
  noSort?: boolean;
  options?: TableOptionProperties[];
  getOptions?: (column, record) => TableOptionProperties[];
  class?: string;
  relatedField?: string;
  emptyValue?: any;
  sticky?: boolean;
}

export interface IHeaderGroup {
  key: string;
  colSpan?: number;
  className?: string;
  name?: string;
}

export interface IFooterColumn {
  key: string;
  value: string;
  className?: string;
}

export interface TableProperties {
  headerGroups?: IHeaderGroup[];
  displayedColumns?: string[];
  columnProperties?: TableColunnProperties[];
  type?: string;
  properties?: {
    actions?: 'actions',
    date?: 'date',
    time?: 'time',
    checkbox?: 'checkbox',
    select?: 'select',
    image?: 'image'
  };
  isEditable?: boolean;
  widthClass?: boolean ;
  length?: number;
  pageSize?: number;
  paginatorMode?: PaginatorMode;
  shownRecords?: number;
}


export enum PaginatorMode {
  Default = 'default',
  ShowMore = 'showMore'
}