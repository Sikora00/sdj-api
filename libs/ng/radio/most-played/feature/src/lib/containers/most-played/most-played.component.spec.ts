import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChannelFacade } from '@sdj/ng/radio/core/domain';
import { LoaderComponent } from '@sdj/ng/shared/presentation-sdj-loader';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { createSpyObj } from 'jest-createspyobj';
import { hot } from 'jest-marbles';
import { MockComponent } from 'ng-mocks';
import { MatAdvancedAudioPlayerComponent } from 'ngx-audio-player';
import { of } from 'rxjs';
import { MostPlayedTracksFacade } from '../../application/most-played-tracks.facade';
import { MostPlayedComponent } from './most-played.component';
import Mocked = jest.Mocked;

describe('MostPlayedComponent', () => {
  let component: MostPlayedComponent;
  let fixture: ComponentFixture<MostPlayedComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          ApolloTestingModule,
        ],
        declarations: [
          MostPlayedComponent,
          MockComponent(LoaderComponent),
          MockComponent(MatAdvancedAudioPlayerComponent),
        ],
        providers: [
          { provide: ChannelFacade, useValue: createSpyObj(ChannelFacade) },
          {
            provide: MostPlayedTracksFacade,
            useValue: createSpyObj(MostPlayedTracksFacade),
          },
        ],
      }).compileComponents();

      const channelFacade = TestBed.inject<ChannelFacade>(ChannelFacade);
      (channelFacade.selectedChannel$ as any) = hot('');
      const trackFacade: Mocked<MostPlayedTracksFacade> = TestBed.inject(
        MostPlayedTracksFacade
      ) as any;
      trackFacade.mostPlayedTracks$ = of([]) as any;
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPlayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
