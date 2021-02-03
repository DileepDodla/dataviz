import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendPressureComponent } from './trend-pressure.component';

describe('TrendPressureComponent', () => {
  let component: TrendPressureComponent;
  let fixture: ComponentFixture<TrendPressureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendPressureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendPressureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
