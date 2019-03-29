import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { forecastComponent } from './forecast.component';

describe('ForecastComponent', () => {
  let component: forecastComponent;
  let fixture: ComponentFixture<forecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ forecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(forecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
