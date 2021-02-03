import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarPressureComponent } from './bar-pressure.component';

describe('BarPressureComponent', () => {
  let component: BarPressureComponent;
  let fixture: ComponentFixture<BarPressureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarPressureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarPressureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
