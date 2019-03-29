import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { forexComponent } from './forex.component';

describe('forexComponent', () => {
  let component: forexComponent;
  let fixture: ComponentFixture<forexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ forexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(forexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
