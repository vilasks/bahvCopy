import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymBlockComponent } from './sym-block.component';

describe('SymBlockComponent', () => {
  let component: SymBlockComponent;
  let fixture: ComponentFixture<SymBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SymBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
