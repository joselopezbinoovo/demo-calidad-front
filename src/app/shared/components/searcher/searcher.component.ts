import { Component, OnInit, Output, Input,EventEmitter,forwardRef } from '@angular/core';
import { Subject, Subscription, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
export interface SearchResult {
  value: string;
  field?: string;
}
export interface SelectValue {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SearcherComponent),
    multi: true
  }]
})
export class SearcherComponent implements OnInit {

  selectFilter = [
    { value: 'x_state', viewValue: '' },
    { value: 'x_state', viewValue: 'Confirmed' },
    { value: 'x_state', viewValue: 'Done' },
    { value: 'x_state', viewValue: 'Progress'},
  ];

  @Output()
  search = new EventEmitter<SearchResult>();


  @Output()
  filter = new EventEmitter<SearchResult>();

  @Input()
  value: string;

  @Input()
  selects: SelectValue;

  valueToSearch: string;

  selectedState:any;

  public keyUp = new Subject<KeyboardEvent>();

  constructor(
    private filterService: FilterService
  ) {
    this.keyUp.pipe(
      map(event => this.value),
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe(value => {
      this.emitChange(value);
    }
    );
  }


  ngOnInit(): void {
      this.valueToSearch = this.selects[0].value;
      this.selectedState = this.selectFilter[0].viewValue;
  }


  emitChange(value): void  {
    const result: SearchResult = { value };
    if (this.valueToSearch) {
      result.field = this.valueToSearch;


    }
    this.search.emit(result);

  }

  onSelectChange(): void  {
    if(this.value){
      this.emitChange(this.value);
    }
  }

  onClickChange(): void  {
    this.emitChange(this.value);
  }

  /// Filter State

  emitChangeState(value): void  {
    const result: SearchResult = {value};
    if (this.selectedState) {
      result.field = this.selectFilter[0].value;
    }
    this.filter.emit(result);
  }

  onStateChange(ob) {
    let selectedState = ob.value;
    this.value = '';
    this.filterService.stateChanged.next(true);
    this.emitChangeState(selectedState.toLowerCase())
  }
}
