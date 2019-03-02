const flag = (img='', body='', position=null) => {
  let flag_position = position;
  if(flag_position) {
    flag_position = ('bottom' === position) ? 'flag--bottom' : 'flag--top';
  }

  return `
<div class="flag ${flag_position}">
    <div class="flag__image">
        ${img}
    </div>
    <div class="flag__body">
        ${body}
    </div>
</div>`
};

export default flag;
