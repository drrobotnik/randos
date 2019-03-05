import constants from './js/constants';
import { RemoteGet } from './js/utilities';
import { cards } from './app';

const container = document.querySelector('.container');

const mobileSize = constants.mobile;
const windowSize = window.outerWidth;

let state;

const preloadState = window.__PRELOADED_STATE__;

const loadState = {
  windowWidth: windowSize,
  mobileOrDesktop: windowSize > mobileSize ? 'desktop' : 'mobile',
  columns: windowSize > mobileSize ? 3 : 1,
}

document.addEventListener("DOMContentLoaded", () => {
  // preload assumes mobile first, re-render if desktop
  if(loadState.mobileOrDesktop !== preloadState.mobileOrDesktop) {
    container.innerHTML = cards(preloadState.users, loadState.columns);
  }
  // combine states
  state = Object.assign(preloadState, loadState);
});

window.addEventListener('resize', () => {
  const mobileOrDesktop = window.outerWidth > mobileSize ? 'desktop' : 'mobile';

  // mutating state.
  if(state.mobileOrDesktop !== mobileOrDesktop) {
    console.log('stateChanged', state.mobileOrDesktop, mobileOrDesktop);
    state.windowWidth = outerWidth;
    state.mobileOrDesktop = mobileOrDesktop;
    state.columns = 'desktop' === state.mobileOrDesktop ? 3 : 1;

    container.innerHTML = cards(state.users, state.columns);
  }
});

document.addEventListener('click', (event) => {
  const gender = event.target.getAttribute('data-gender');
  if(gender) {
    RemoteGet(`?results=9&gender=${gender}`, (data) => {
      state.users = data.results;
      container.innerHTML = cards(state.users, state.columns);
    });
  }
});
