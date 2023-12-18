import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IHeaderParam{
  label: string;
  value?: any;
}

@Injectable({
  providedIn: 'root'
})

export class HeaderService {
  private params$: BehaviorSubject<IHeaderParam[]>;

  constructor() {
    this.params$ = new BehaviorSubject([]);
   }

  getParams(){
    return this.params$.asObservable();
  }

  setParams(params: IHeaderParam[]){
    this.params$.next(params);
  }

  clearParams(){
    this.params$.next([]);
  }

}
