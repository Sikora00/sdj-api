import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from '@sdj/ng/shared/presentation-sdj-loader';
import { MockComponent } from 'ng-mocks';

import { AwesomePlayerComponent } from './awesome-player.component';

describe('AwesomePlayerComponent', () => {
  let component: AwesomePlayerComponent;
  let fixture: ComponentFixture<AwesomePlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AwesomePlayerComponent, MockComponent(LoaderComponent)]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwesomePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
