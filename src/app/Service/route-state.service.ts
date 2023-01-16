import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Dictionary<T> {
  [Key: string]: T;
}

@Injectable({
  providedIn: 'root'
})
export class RouteStateService {

  private parameterState = new BehaviorSubject<Dictionary<string>>({});
  private pageState = new BehaviorSubject<string>("");

  parameter: Observable<Dictionary<string>>;
  page: Observable<string>;


  constructor() { 
    this.parameter = this.parameterState.asObservable();
    this.page = this.pageState.asObservable();
  }

  updateParameterState(newParameter: Dictionary<string>){
    this.parameterState.next(newParameter);
  }

  updateCurrentPage(newPage: string){
    this.pageState.next(newPage);
  }

}
