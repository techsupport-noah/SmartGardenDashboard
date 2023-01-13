import { state } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { HttpProviderService } from '../Service/http-provider.service';
import { RouteStateService } from '../Service/route-state.service';
import { TestType } from '../types/test.type';

@Component({
  selector: 'app-data-view-list',
  templateUrl: './data-view-list.component.html',
  styleUrls: ['./data-view-list.component.scss'],
  host: {'class': 'col-12'} //add general container margin
})
export class DataViewListComponent implements OnInit, OnDestroy {

  private destroySignal = new Subject<void>();
  dataPoints : TestType[] = [];

  constructor(
    private route: ActivatedRoute,
    private routeStateService : RouteStateService,
    private httProvider : HttpProviderService    
    ){}

  ngOnInit() : void {
    this.route.params.pipe(
      takeUntil(this.destroySignal)
      )
    .subscribe(params => {
      this.routeStateService.updateParameterState(params)
    })
    this.httProvider.getTestdata().subscribe(data => {
      if (data != null && data.body != null) {
        this.dataPoints = <TestType[]>JSON.parse(JSON.stringify(data.body));
      }
    })

  }

  ngOnDestroy(): void {
    this.destroySignal.next();
    this.destroySignal.complete(); //signal subscription to end
    this.routeStateService.updateParameterState({}); //clear state
  }
 
}
