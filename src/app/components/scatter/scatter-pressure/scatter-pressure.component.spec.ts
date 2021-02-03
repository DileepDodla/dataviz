import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterPressureComponent } from './scatter-pressure.component';

describe('ScatterPressureComponent', () => {
  let component: ScatterPressureComponent;
  let fixture: ComponentFixture<ScatterPressureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScatterPressureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterPressureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
