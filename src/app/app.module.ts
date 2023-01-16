import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DataViewComponent } from './data-view/data-view.component';
import { DataViewListComponent } from './data-view-list/data-view-list.component';
import { DataViewDiagramComponent } from './data-view-diagram/data-view-diagram.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DataViewComponent,
    DataViewListComponent,
    DataViewDiagramComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
        
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
