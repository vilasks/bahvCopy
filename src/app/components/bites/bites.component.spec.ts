import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitesComponent } from './bites.component';

describe('BitesComponent', () => {
  let component: BitesComponent;
  let fixture: ComponentFixture<BitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
