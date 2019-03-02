const column = (content, columns) => {
  // we want a percentage width;
  const size = parseFloat((1/columns)*100).toFixed(4);
  return `<div class="grid-column" style="flex-basis: ${size}%; max-width: ${size}%;">${content}</div>`;
}

const grid = (content=[], columns=3) => {
  
  const cols = content.map((html) => column(html, columns)).join('');

  return `<div class="grid">
    ${cols}
  </div>`;
}

export default grid;