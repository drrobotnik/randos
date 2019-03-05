import { nav, cards } from './app';
import serialize from 'serialize-javascript'; // fancy form of JSON.stringify();

const render = (data, preloadedState, metas) => {

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
    />
    <link
      rel="stylesheet"
      type="text/css"
      media="screen"
      href="./css/main.css"
    />

    <script
      crossorigin="anonymous"
      src="https://polyfill.io/v3/polyfill.min.js?flags=gated&features=default"
    ></script>
  </head>
  <body>
    <div id="app">
      <nav class="nav">${nav()}</nav>
      <div class="container">${cards(data, 1)}</div>
      <script>
          window.__PRELOADED_STATE__ = ${serialize(preloadedState)}
        </script>
    </div>
    <script src="./bundle.js"></script>
  </body>
</html>
`;
};

export default render;