import { RemoteGet } from './js/utilities';
import genderButton from './components/Button/genderButton';
import userCard from './components/Cards/userCard';
import grid from './components/Grid/grid';

import constants from './js/constants';

const app = () => {
  let users;
  const mobileSize = constants.mobile;
  const windowSize = window.outerWidth;
  
  const nav = document.querySelector('.nav');
  const container = document.querySelector('.container');

  let state = {
    windowWidth: windowSize,
    mobileOrDesktop: windowSize > mobileSize ? 'desktop' : 'mobile'
  };

  const renderGenderButtons = genders => genders.map((gender) => genderButton(gender)).join('');

  const userCards = users => users.map((user) => userCard(user));

  const renderNav = () => {
    /* Complete gender set from data:
     * const genderSet = [...new Set(users.map( user => user.gender))];  
    */
    const genderSet = ['male', 'female'];
    nav.innerHTML = renderGenderButtons(genderSet);
  }

  const init = (data) => {
    users = data;

    const columns = 'desktop' === state.mobileOrDesktop ? 3:1;
    

    container.innerHTML = grid(userCards(users), columns);
  }

  const render = () => {

    const mobileOrDesktop = window.outerWidth > mobileSize ? 'desktop' : 'mobile';

    // mutating state.
    if(state.mobileOrDesktop !== mobileOrDesktop ) {

      console.log('stateChanged', state.mobileOrDesktop, mobileOrDesktop);
      state.windowWidth = window.outerWidth;
      state.mobileOrDesktop = mobileOrDesktop;

      const columns = 'desktop' === state.mobileOrDesktop ? 3:1;

      container.innerHTML = grid(userCards(users), columns);
    }
  }

  return {
    init,
    render,
    renderNav,
  }
}

const App = app();

App.renderNav();

RemoteGet('?results=9', (data) => App.init(data.results));

window.addEventListener('resize', App.render);

document.addEventListener('click', (event) => {
  const gender = event.target.getAttribute('data-gender');
  if(gender) {
    RemoteGet(`?results=9&gender=${gender}`, (data) => App.init(data.results));
  }
});
