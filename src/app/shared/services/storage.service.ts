import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    public selectedFormType$: BehaviorSubject<string>;

    constructor(

      ) {
        this.selectedFormType$ = new BehaviorSubject<string>(null);
      }

    setSelectedFormType(data){
      localStorage.setItem('selectedFormType', data );
    }

    getSelectedFormType(){
     return localStorage.getItem('selectedFormType');
    }

}