import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './content/content.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SmartGardenDashboard';
}
