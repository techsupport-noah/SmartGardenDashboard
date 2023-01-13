import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { RouteStateService } from '../Service/route-state.service';
import { Route } from '@angular/router';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
    host: {'class': 'row mx-2 my-4'} //add general container margin
})
export class DataViewComponent implements OnInit {
  title : string = '{title}';
  private stopSignal = new Subject<void>();

  constructor(
    private routeState: RouteStateService,
    private changeDetectorRef: ChangeDetectorRef
    ){
     
  }

  ngOnInit() {
    this.routeState.parameter.pipe(
      takeUntil(this.stopSignal)
    )
    .subscribe( parameters => {
      this.title = this.getTitle(String(parameters["title"]));
      this.changeDetectorRef.detectChanges(); //update view as this subscription is async
    })
  }

  getTitle(dataType : string) : string {
    switch(dataType){
      case "light":
        return "Lichtdaten";  
      case "temp":
        return "Temperaturdaten";  
      case "humid":
        return "Feuchtigkeitsdaten";
      default:
        return "{title}";
    }
  }
}
