import { mockConfig } from '../mocks/configs';
import { MockEventEmitter } from '../mocks/mock-event-emitter';
import { assignSocket } from '../mocks/websocket';
import { registerCommonFixtures } from './register-common-fixtures';

export function login(): void {
  window.localStorage.setItem('token', 'xoxo');
}

export const isPlaying = (el: HTMLAudioElement) => {
  return el.duration > 0 && !el.paused && !el.muted;
};

export const resolveApp = (route) => {
  login();
  cy.server();
  registerCommonFixtures();

  cy.visit(route, {
    onBeforeLoad(win: Window): void {
      // @ts-ignore
      win.io = (url) => {
        const socket = new MockEventEmitter();
        assignSocket(socket);
        return socket;
      };
      // @ts-ignore
      win.__env = {
        ...mockConfig,
      };
    },
  });
};
