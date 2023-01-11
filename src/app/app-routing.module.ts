import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DataViewDiagramComponent } from './data-view-diagram/data-view-diagram.component';
import { DataViewListComponent } from './data-view-list/data-view-list.component';

const routes: Routes = [
  { path: 'ViewList/:plantId/:dataType', component:  DataViewListComponent},
  { path: 'ViewVisual/:plantId/:dataType', component:  DataViewDiagramComponent},
  { path: '*', component: AppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
