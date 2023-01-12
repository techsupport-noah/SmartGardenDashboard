import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DataViewDiagramComponent } from './data-view-diagram/data-view-diagram.component';
import { DataViewListComponent } from './data-view-list/data-view-list.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component:  HomeComponent},
  { path: 'ViewList/:dataType', component:  DataViewListComponent},
  { path: 'ViewList', component:  DataViewListComponent},
  { path: 'ViewDiagram/:dataType', component:  DataViewDiagramComponent},
  { path: 'ViewDiagram', component:  DataViewDiagramComponent},
  { path: '*', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{paramsInheritanceStrategy: 'always'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
