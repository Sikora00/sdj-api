import { resolveApp } from '../support/helpers/helpers';
import {
  getChannelListItem,
  getNavbarList,
} from '../support/selectors/main.selectors';
import { getPlayButton } from '../support/selectors/radio.selectors';

describe('SDJ', () => {
  beforeEach(() => {
    resolveApp('/');
  });

  it('should display player', () => {
    getPlayButton().should('be.visible');
  });

  it('should contain channels list', () => {
    getNavbarList().within(() => {
      getChannelListItem().should('have.length.greaterThan', 1);
    });
  });
});
