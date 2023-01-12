import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-data-view-list',
  templateUrl: './data-view-list.component.html',
  styleUrls: ['./data-view-list.component.scss']
})
export class DataViewListComponent {

  constructor(private route: ActivatedRoute){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      //console.log(params.get('dataType'));
    });
  }
 
}
