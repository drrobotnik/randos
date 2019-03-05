import express from 'express';
import ssr from './src/ssr';
const fetch = require('node-fetch');

import constants from './src/js/constants';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);


const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };


// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', asyncMiddleware(async (req, res, next) => {
  /* 
    if there is an error thrown in getUserFromDb, asyncMiddleware
    will pass it to next() and express will handle the error;
  */
 const users = await fetch(`${constants.api.domain}${constants.api.basePath}?results=9`)
    .then(res => res.json())
    .then(data => data.results);

    const preloadState = {
      windowWidth: 800,
      mobileOrDesktop: 'mobile',
      columns: 1,
      users
    };
  
    res.send(ssr(users, preloadState, {title: 'test page'}));
}));
