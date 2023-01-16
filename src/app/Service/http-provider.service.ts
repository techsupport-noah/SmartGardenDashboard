import { Injectable } from '@angular/core';
import { WebApiService } from './web-api.service';
import { Observable } from 'rxjs';
import { DatapointType } from '../types/datapoint.type';

var apiUrl = "http://localhost:80";

var httpLink = {
  getTestdata: apiUrl + "/api/api.php?test=true",
  getData: apiUrl + "/api/api.php?"
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
  
  public getValuesByName(plantname: string, dataname: string) : Observable<any> {
    return this.webApiService.get(httpLink.getData + "query=" + plantname + "_" + dataname);    
  }

  public getPlants() : Observable<any> {
    return this.webApiService.get(httpLink.getData + "query=pflanzen");    
  }

}   
