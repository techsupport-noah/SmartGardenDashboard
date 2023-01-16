import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DataViewDiagramComponent } from './data-view-diagram/data-view-diagram.component';
import { DataViewListComponent } from './data-view-list/data-view-list.component';
import { DataViewComponent } from './data-view/data-view.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component:  HomeComponent},
  { 
    path: 'View',
    component:  DataViewComponent,
    children: [
      { path: 'List/:plantname/:dataname', component:  DataViewListComponent},
      { path: 'List', component:  DataViewListComponent},
      { path: 'Diagram/:plantname/:dataname', component:  DataViewDiagramComponent},
      { path: 'Diagram', component:  DataViewDiagramComponent},
    ]
  },
  { path: '*', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{paramsInheritanceStrategy: 'always'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
