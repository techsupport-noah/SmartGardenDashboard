import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
    host: {'class': 'container-fluid'}

})
export class ContentComponent implements OnInit {
  title : string = 'title unset';
  
  constructor(private route: ActivatedRoute){
     
  }

  ngOnInit() {
    if(this.route.firstChild)
    this.route.firstChild.paramMap.subscribe(params => {
      this.title = this.getTitle(String(params.get('dataType')));
    });
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
        return "Startseite";
    }
  }
}
