import { Injectable } from '@angular/core';
import { WebApiService } from './web-api.service';
import { Observable } from 'rxjs';

var apiUrl = "http://localhost:80/";

var httpLink = {
  getTestdata: apiUrl + "/api/api.php?test=true",
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getTestdata(): Observable<any> {
    return this.webApiService.get(httpLink.getTestdata);
  }
  // public deleteEmployeeById(model: any): Observable<any> {
  //   return this.webApiService.post(httpLink.deleteEmployeeById + '?employeeId=' + model, "");
  // }
  // public getEmployeeDetailById(model: any): Observable<any> {
  //   return this.webApiService.get(httpLink.getEmployeeDetailById + '?employeeId=' + model);
  // }
  // public saveEmployee(model: any): Observable<any> {
  //   return this.webApiService.post(httpLink.saveEmployee, model);
  // }  
}   