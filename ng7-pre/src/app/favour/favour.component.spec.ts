import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { favourComponent } from './favour.component';

describe('FavourComponent', () => {
  let component: favourComponent;
  let fixture: ComponentFixture<favourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ favourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(favourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
