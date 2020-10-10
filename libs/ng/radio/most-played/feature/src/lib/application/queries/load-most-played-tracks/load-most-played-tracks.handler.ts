import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  TrackDataService,
  TrackPersistenceService,
} from '@sdj/ng/radio/core/application-services';
import { Track } from '@sdj/ng/radio/core/domain';
import { Observable } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { MostPlayedTracksReceivedEvent } from '../../events/most-played-tracks-received.event';
import { LoadMostPlayedTracksQuery } from './load-most-played-tracks.query';

@Injectable()
export class LoadMostPlayedTracksHandler {
  @Effect() handle$ = this.actions$.pipe(
    ofType(LoadMostPlayedTracksQuery.type),
    switchMap((query: LoadMostPlayedTracksQuery) => this.handle(query))
  );

  handle(query: LoadMostPlayedTracksQuery): Observable<Action> {
    return this.trackRepository.getMostPlayedTracks(query.channelId).pipe(
      map((res) => res.data.mostPlayedTracks),
      switchMap((tracks) =>
        this.trackPersistenceService.save(tracks).pipe(mapTo(tracks))
      ),
      map(
        (tracks: Track[]) =>
          new MostPlayedTracksReceivedEvent(tracks.map((track) => track.id))
      )
    );
  }

  constructor(
    private actions$: Actions,
    private trackRepository: TrackDataService,
    private trackPersistenceService: TrackPersistenceService
  ) {}
}
