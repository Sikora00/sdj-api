import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { SelectChannelService } from './select-channel.service';

describe('SelectChannelService', () => {
  // tslint:disable-next-line: prefer-const
  let actions: Observable<Action>;
  let service: SelectChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SelectChannelService,
        provideMockActions(() => actions),
        provideMockStore({ initialState: {} }),
      ],
    });
    service = TestBed.inject(SelectChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
