import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataViewListComponent } from './data-view-list.component';

describe('DataViewListComponent', () => {
  let component: DataViewListComponent;
  let fixture: ComponentFixture<DataViewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataViewListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
