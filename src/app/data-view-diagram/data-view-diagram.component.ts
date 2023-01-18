import { ChangeDetectorRef, Component, ViewChild, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteStateService } from '../Service/route-state.service';
import { HttpProviderService } from '../Service/http-provider.service';
import { DatapointType } from '../types/datapoint.type';
import { Subject, takeUntil } from 'rxjs';
import { Chart } from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

@Component({
  selector: 'app-data-view-diagram',
  templateUrl: './data-view-diagram.component.html',
  styleUrls: ['./data-view-diagram.component.scss']
})
export class DataViewDiagramComponent implements OnInit, OnDestroy{
  public chart: any;
  _dataPoints : DatapointType[] = [];
  private destroySignal = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private routeStateService : RouteStateService,
    private changeDetectorRef : ChangeDetectorRef,
    private httProvider : HttpProviderService    
    ){
      Chart.register(zoomPlugin);
    }

  ngOnInit() : void {
    this.route.params.pipe(
      takeUntil(this.destroySignal)
      )
    .subscribe(params => {
      this.routeStateService.updateParameterState(params);
      this.routeStateService.updateCurrentPage("View/Diagram");
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
      this._dataPoints = [];
      this.createEmptyChart();
      return;
    }
    this.httProvider.getValuesByName(plantname, dataname).subscribe(data => {
      if (data != null && data.body != null) {
        this._dataPoints = <DatapointType[]>JSON.parse(JSON.stringify(data.body));
        this.changeDetectorRef.detectChanges(); //update view as this subscription is async
        this.createChart();
      }
    })
  }

  createEmptyChart(){
    var y_vals : number[] = [];
    var x_vals : string[] = [];

    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: x_vals, 
        datasets: [
        {
          label: "Daten",
          data: y_vals,
          backgroundColor: '#2596be'
        },
        ]
      },
      options: {
        aspectRatio:2.5,

      }
      
    });
  }

  createChart(){
    var y_vals : number[] = [];
    var x_vals : string[] = [];
  
    this._dataPoints.forEach(element => {
      y_vals.push(element.value);
      x_vals.push(element.timepoint.toString());
    })

    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: x_vals, 
        datasets: [
        {
          label: "Daten",
          data: y_vals,
          backgroundColor: '#2596be'
        },
        ]
      },
      options: {
        aspectRatio:2.5,
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
                speed: 0.01
              },
              pinch: {
                enabled: true
              },
              mode: 'x',
            }
          }
        }
      }
      
    });
  }



}
