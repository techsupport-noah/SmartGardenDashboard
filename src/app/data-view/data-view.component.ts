import { ChangeDetectorRef, Component, ContentChild, OnInit} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { RouteStateService } from '../Service/route-state.service';
import { Route, Router, RouterOutlet } from '@angular/router';
import { DataViewListComponent } from '../data-view-list/data-view-list.component';
import { HttpProviderService } from '../Service/http-provider.service';
import { Plant } from '../types/plant.type';
import { UploadDataCompletedEventArgsDescriptionMetadata } from 'igniteui-angular-core';


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
  plants : Plant[] = [];
  page : string = "";
  reloadFlag : boolean = false;

  constructor(
    private routeState: RouteStateService,
    private router: Router,
    private httProvider : HttpProviderService,  
    private changeDetectorRef : ChangeDetectorRef,
    ){
     
  }

  ngOnInit() {
    //get list of plants
    this.httProvider.getPlants().subscribe(data => {
      if (data != null && data.body != null) {
        this.plants = <Plant[]>JSON.parse(JSON.stringify(data.body));
        this.changeDetectorRef.detectChanges(); //update view as this subscription is async
      }
    })

    this.dataTypeSelect = 'default'
    this.plantNameSelect = 'default'

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
      this.changeDetectorRef.detectChanges(); //update view as this subscription is async
   
    })
   
    this.routeState.page.pipe(
      takeUntil(this.stopSignal)
    )
    .subscribe( page => {
      this.page = page;
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

  update() {
    //console.log(this.dataTypeSelect);
    //this.listViewComponent.update(this.plantNameSelect,this.dataTypeSelect);
    this.router.navigateByUrl('/', {skipLocationChange: true})
    .then(()=> //bypass no reloading of router
      this.router.navigate([this.page, this.plantNameSelect, this.dataTypeSelect])
    );
  }
}


