import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';
import videos from '../src/data/videos.json';


function handleRender(req, res) {
  const html = ReactDOMServer.renderToString(<App />);
  fs.readFile(path.join(__dirname, './index.html'), 'utf8', function (err, data) {
    if (err) throw err;

    // Inserts the rendered React HTML into our main div
    const document = data.replace(/<div id='root'><\/div>/, `<div id="root">${html}</div>`);

    // Sends the response back to the client
    res.send(document);
  });
}

const app = express();

// Serve built files with static files middleware
app.use('/build', express.static(path.join(__dirname, '../build')));

// Serve requests with our handleRender function
app.get('/videos', function(req, res) {
  res.send(JSON.stringify(videos));
});

app.get('*', handleRender);

app.listen(3000);
