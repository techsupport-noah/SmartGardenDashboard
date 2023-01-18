import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpProviderService } from '../Service/http-provider.service';
import { Plant } from '../types/plant.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {'class': 'row mx-2 my-4'}, //add general container margin
})
export class HomeComponent implements OnInit {
  plants : Plant[] = [];
  plantNameAddInput: any;
  plantNameDeleteInput: any;

  constructor(
    private httProvider : HttpProviderService,  
    private changeDetectorRef : ChangeDetectorRef,
  ){}
  
  ngOnInit() {
    //get list of plants
    this.httProvider.getPlants().subscribe(data => {
    if (data != null && data.body != null) {
      this.plants = <Plant[]>JSON.parse(JSON.stringify(data.body));
      this.changeDetectorRef.detectChanges(); //update view as this subscription is async
    }
    })
  }

  addPlant() {
    //get value of name input
    var plantName = this.plantNameAddInput;
    if (plantName!= null && plantName.length > 0) {
      this.httProvider.addPlant(plantName).subscribe(data => {
        if (data!= null && data.body!= null) {
          //check post answer
          if (data.body.success == true) {
            //reload page
            //window.location.reload();
          }
        }
      })
    }
  }

  deletePlant() {
    //get value of name input
    var plantName = this.plantNameDeleteInput;
    if (plantName!= null && plantName.length > 0) {
      this.httProvider.deletePlant(plantName).subscribe(data => {
        if (data!= null && data.body!= null) {
          //check post answer
          if (data.body.success == true) {
            //reload page
            window.location.reload();
          }
        }
      })
    }
  }

}
