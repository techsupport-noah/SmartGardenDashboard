import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { DataViewComponent } from './data-view/data-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {'class': 'container-fluid d-block'} //add general container margin
})
export class AppComponent {
  title = 'SmartGardenDashboard';
}
