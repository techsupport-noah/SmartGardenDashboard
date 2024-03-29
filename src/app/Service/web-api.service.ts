import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  // executes http get with json data
  get(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        //'Cache-Control' : 'no-cache'
      }),
      observe: "response" as 'body'
    };
    return this.httpClient.get(
      url,
      httpOptions
      )
      .pipe( //observable wird praktisch weitergereicht
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      );
  }

  // Post call method 
  // Param 1 : url
  // Param 2 : model
  post(url: string, model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), 
     observe: "response" as 'body'
    };
    return this.httpClient.post(
      url,
      model,
      httpOptions
      )
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      );
  }
  private ReturnResponseData(response: any) {
    return response;
  }
  private handleError(error: any) {
    return throwError(error);
  }
}

