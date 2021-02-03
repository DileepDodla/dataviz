import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendTemperatureComponent } from './trend-temperature.component';

describe('TrendTemperatureComponent', () => {
  let component: TrendTemperatureComponent;
  let fixture: ComponentFixture<TrendTemperatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendTemperatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
