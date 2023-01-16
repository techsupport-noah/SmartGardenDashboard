import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { HttpProviderService } from '../Service/http-provider.service';
import { RouteStateService } from '../Service/route-state.service';
import { DatapointType } from '../types/datapoint.type';
import { TestType } from '../types/test.type';

@Component({
  selector: 'app-data-view-list',
  templateUrl: './data-view-list.component.html',
  styleUrls: ['./data-view-list.component.scss'],
  host: {'class': 'col-12'} //add general container margin
})
export class DataViewListComponent implements OnInit, OnDestroy {

  private destroySignal = new Subject<void>();
  dataPoints : DatapointType[] = [];

  constructor(
    private route: ActivatedRoute,
    private routeStateService : RouteStateService,
    private changeDetectorRef : ChangeDetectorRef,
    private httProvider : HttpProviderService    
    ){}

  ngOnInit() : void {
    this.route.params.pipe(
      takeUntil(this.destroySignal)
      )
    .subscribe(params => {
      this.routeStateService.updateParameterState(params)
    })
    
    this.update(
      this.route.snapshot.paramMap.get("plantname") as string,
      this.route.snapshot.paramMap.get("dataname") as string
    );

  }

  ngOnDestroy(): void {
    this.destroySignal.next();
    this.destroySignal.complete(); //signal subscription to end
    this.routeStateService.updateParameterState({}); //clear state
  }
 
  update(plantname: string , dataname: string ) {
    if(plantname == "default" || plantname == null || dataname == "default" || dataname == null){
      this.dataPoints = [];
      return;
    }
    this.httProvider.getValuesByName(plantname, dataname).subscribe(data => {
      if (data != null && data.body != null) {
        this.dataPoints = <DatapointType[]>JSON.parse(JSON.stringify(data.body));
        this.changeDetectorRef.detectChanges(); //update view as this subscription is async
      }
    })
  }
}
