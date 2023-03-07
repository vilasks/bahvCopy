import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatCalenderComponent } from './heat-calender.component';

describe('HeatCalenderComponent', () => {
  let component: HeatCalenderComponent;
  let fixture: ComponentFixture<HeatCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeatCalenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeatCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
