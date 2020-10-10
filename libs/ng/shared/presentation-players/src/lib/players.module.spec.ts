import { TestBed, waitForAsync } from '@angular/core/testing';
import { PlayersModule } from './players.module';

describe('PlayersModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [PlayersModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(PlayersModule).toBeDefined();
  });
});
