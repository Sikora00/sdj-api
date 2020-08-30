import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TrackDataService } from '../../../ports/track-data.service';
import { MostPlayedTracksReceivedEvent } from '../../events/most-played-tracks-received.event';
import { LoadMostPlayedTracksQuery } from './load-most-played-tracks.query';

@Injectable({ providedIn: 'root' })
export class LoadMostPlayedTracksHandler {
  @Effect() handle$ = this.actions$.pipe(
    ofType(LoadMostPlayedTracksQuery.type),
    switchMap((query: LoadMostPlayedTracksQuery) => this.handle(query))
  );

  handle(query: LoadMostPlayedTracksQuery): Observable<Action> {
    return this.trackRepository
      .getMostPlayedTracks(query.channelId)
      .pipe(
        map(
          result =>
            new MostPlayedTracksReceivedEvent(result.data.mostPlayedTracks)
        )
      );
  }

  constructor(
    private actions$: Actions,
    private trackRepository: TrackDataService
  ) {}
}
