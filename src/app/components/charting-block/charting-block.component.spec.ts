import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartingBlockComponent } from './charting-block.component';

describe('ChartingBlockComponent', () => {
  let component: ChartingBlockComponent;
  let fixture: ComponentFixture<ChartingBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartingBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartingBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
