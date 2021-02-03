import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterTemperatureComponent } from './scatter-temperature.component';

describe('ScatterTemperatureComponent', () => {
  let component: ScatterTemperatureComponent;
  let fixture: ComponentFixture<ScatterTemperatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScatterTemperatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
