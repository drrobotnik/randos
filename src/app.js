import genderButton from './components/Button/genderButton';
import userCard from './components/Cards/userCard';
import grid from './components/Grid/grid';

const renderGenderButtons = genders => genders.map((gender) => genderButton(gender)).join('');

const nav = (genderSet=['male', 'female']) => renderGenderButtons(genderSet);

const cards = (users, columns) => {
  const userCards = users => users.map((user) => userCard(user));
  return grid(userCards(users), columns);
}

export { cards, nav };
