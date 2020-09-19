import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { MockComponent } from 'ng-mocks';

import { RadioActionMenuComponent } from './radio-action-menu.component';

describe('RadioActionMenuComponent', () => {
  let component: RadioActionMenuComponent;
  let fixture: ComponentFixture<RadioActionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadioActionMenuComponent, MockComponent(MatIcon)]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioActionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
