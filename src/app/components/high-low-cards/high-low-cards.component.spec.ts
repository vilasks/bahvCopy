import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighLowCardsComponent } from './high-low-cards.component';

describe('HighLowCardsComponent', () => {
  let component: HighLowCardsComponent;
  let fixture: ComponentFixture<HighLowCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighLowCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighLowCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
