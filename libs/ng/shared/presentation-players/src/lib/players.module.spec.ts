import { async, TestBed } from '@angular/core/testing';
import { PlayersModule } from './players.module';

describe('PlayersModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PlayersModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PlayersModule).toBeDefined();
  });
});
