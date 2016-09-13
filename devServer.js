'use strict';

var path = require('path');
var express = require('express');
var webpack = require('webpack');

var config = require("./webpack.config.dev.js");

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: '/'
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/dist', express.static('docs/dist'));
app.use('/images', express.static('docs/src/images'));
app.use('/json', express.static('docs/src/json'));
app.use('/lib', express.static('docs/lib'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'docs/src/index.html'));
});

app.get('/form.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'standalone/form/index.html'));
});

app.get('/formBuilder.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'standalone/formBuilder/formBuilder.html'));
});

app.post('/upload', function (req, res) {
  res.send({success: true, id: Date.now().toString()})
})
app.post('/uploadimg', function (req, res) {
  res.send({success: true, id: 'https://gw.alicdn.com/tps/TB16sK8LpXXXXbGaXXXXXXXXXXX-156-154.png'})
})

app.listen(3001, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3001');
});