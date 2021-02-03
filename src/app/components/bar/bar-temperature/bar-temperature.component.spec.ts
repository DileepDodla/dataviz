import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarTemperatureComponent } from './bar-temperature.component';

describe('BarTemperatureComponent', () => {
  let component: BarTemperatureComponent;
  let fixture: ComponentFixture<BarTemperatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarTemperatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
