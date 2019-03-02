import flag from '../Flag/flag';
import avatar from '../Avatar/avatar';

const userCard = (user) => {
  const { name: { first, last }, email, gender, picture: { thumbnail } } = user;
  const body = `<p><strong>${first} ${last}</strong><br />
  ${email}<br />
  </p>`;
  return `<div class="card card-user ${gender}">${flag(avatar(thumbnail), `${body}`)}</div>`;
}

export default userCard;
