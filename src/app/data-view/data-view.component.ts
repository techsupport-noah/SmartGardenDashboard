import { Component, ContentChild, OnInit} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { RouteStateService } from '../Service/route-state.service';
import { Route, Router, RouterOutlet } from '@angular/router';
import { DataViewListComponent } from '../data-view-list/data-view-list.component';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
  host: {'class': 'row mx-2 my-4'}, //add general container margin
})
export class DataViewComponent implements OnInit {

  title : string = '{title}';
  private stopSignal = new Subject<void>();
  dataTypeSelect : any = "";
  plantNameSelect : any = "";

  constructor(
    private routeState: RouteStateService,
    private router: Router
    ){
     
  }

  ngOnInit() {
    this.routeState.parameter.pipe(
      takeUntil(this.stopSignal)
    )
    .subscribe( parameters => {
      if(parameters["dataname"]){
        this.dataTypeSelect = parameters["dataname"];
      }
      if(parameters["plantname"]){
        this.plantNameSelect = parameters["plantname"];
      }
    })
    this.dataTypeSelect = 'default'
    this.plantNameSelect = 'default'
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

  update() {
    console.log(this.dataTypeSelect);
    //this.listViewComponent.update(this.plantNameSelect,this.dataTypeSelect);
    this.router.navigateByUrl('/', {skipLocationChange: true})
    .then(()=> //bypass no reloading of router
      this.router.navigate(['View/List', this.plantNameSelect, this.dataTypeSelect])
    );
  }


}


