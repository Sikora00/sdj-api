import { WebSocketEvents } from '@sdj/shared/domain';
import { isPlaying, resolveApp } from '../support/helpers/helpers';
import { mockConfig } from '../support/mocks/configs';
import {
  getArtistNameElement,
  getPlayButton,
  getPlayerHtmlAudioElement,
  getQueuedTracks,
  getTrackNameElement,
} from '../support/selectors/radio.selectors';

describe('Radio', () => {
  const channelId = 'C9RQHAD53';
  beforeEach(() => {
    resolveApp(channelId);
  });

  describe('Player', () => {
    it('should play', () => {
      getPlayButton().click();
      cy.wait(2000);
      getPlayerHtmlAudioElement().then((els: JQuery<HTMLAudioElement>) => {
        const el: HTMLAudioElement = els.get(0);
        expect(isPlaying(el)).to.eq(true);
      });
    });

    it('should play radio', () => {
      cy.wait(2000);
      cy.emmitInWs(WebSocketEvents.roomIsRunning);
      getPlayButton().click();
      getPlayerHtmlAudioElement().then((els: JQuery<HTMLAudioElement>) => {
        const el: HTMLAudioElement = els.get(0);
        expect(el.src).to.eq('http:' + mockConfig.radioStreamUrl + channelId);
      });
    });
  });

  describe('Queue', () => {
    it('should display current track', () => {
      cy.wait(2000);
      cy.emmitInWs(WebSocketEvents.roomIsRunning);
      cy.emmitInWs(WebSocketEvents.queuedTrackList, [
        { track: { title: 'Song 1' }, addedBy: { name: 'Maciej Sikorski' } },
      ]);
      getTrackNameElement().contains('Song 1');
      getArtistNameElement().contains('Maciej Sikorski');
    });

    it('should display tracks in queue', () => {
      cy.wait(2000);

      cy.emmitInWs(WebSocketEvents.queuedTrackList, [
        {
          track: { id: '2Lb2BiUC898', title: 'Song 1' },
          addedBy: { name: 'Maciej Sikorski' },
        },
        {
          track: { id: '2Lb2BiUC898', title: 'Song 2' },
          addedBy: { name: 'Maciej Sikorski' },
        },
        {
          track: { id: '2Lb2BiUC898', title: 'Song 3' },
          addedBy: { name: 'Maciej Sikorski' },
        },
      ]);
      getQueuedTracks().its('length').should('eq', 2);
    });

    it('should handle changes on queue', () => {
      cy.wait(2000);
      cy.emmitInWs(WebSocketEvents.roomIsRunning);
      cy.emmitInWs(WebSocketEvents.queuedTrackList, [
        { track: { title: 'Song 1' }, addedBy: { name: 'Maciej Sikorski' } },
      ]);
      getTrackNameElement().contains('Song 1');
      getArtistNameElement().contains('Maciej Sikorski');

      cy.emmitInWs(WebSocketEvents.queuedTrackList, [
        {
          track: { id: '2Lb2BiUC898', title: 'Song 1' },
          addedBy: { name: 'Maciej Sikorski' },
        },
        {
          track: { id: '2Lb2BiUC898', title: 'Song 2' },
          addedBy: { name: 'Maciej Sikorski' },
        },
        {
          track: { id: '2Lb2BiUC898', title: 'Song 3' },
          addedBy: { name: 'Maciej Sikorski' },
        },
      ]);
      cy.wait(1000);

      getTrackNameElement().contains('Song 1');
      getArtistNameElement().contains('Maciej Sikorski');
      getQueuedTracks().its('length').should('eq', 2);

      cy.emmitInWs(WebSocketEvents.queuedTrackList, [
        {
          track: { id: '2Lb2BiUC898', title: 'Song 2' },
          addedBy: { name: 'Maciej Sikorski' },
        },
        {
          track: { id: '2Lb2BiUC898', title: 'Song 3' },
          addedBy: { name: 'Maciej Sikorski' },
        },
      ]);
      cy.wait(1000);

      getTrackNameElement().contains('Song 2');
      getArtistNameElement().contains('Maciej Sikorski');
      getQueuedTracks().its('length').should('eq', 1);
    });
  });
});
