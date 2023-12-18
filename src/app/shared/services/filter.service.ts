import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FilterService {

  stateChanged: EventEmitter<boolean> = new EventEmitter()

  constructor() { }

}
