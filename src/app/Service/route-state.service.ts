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

  parameter: Observable<Dictionary<string>>;

  constructor() { 
    this.parameter = this.parameterState.asObservable();
  }

  updateParameterState(newParameter: Dictionary<string>){
    this.parameterState.next(newParameter);
  }

}
