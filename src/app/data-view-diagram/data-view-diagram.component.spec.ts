import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataViewDiagramComponent } from './data-view-diagram.component';

describe('DataViewDiagramComponent', () => {
  let component: DataViewDiagramComponent;
  let fixture: ComponentFixture<DataViewDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataViewDiagramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataViewDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
