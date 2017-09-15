var express = require('express');
var app = express();

// try:
// var cors = require('cors')
// app.use(cors());


var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

var chatterboxData = {results:[{
  username: 'seva',
  text: 'hi there!'
}]}

app.use('/classes/messages', function (req, res, next) {
  res.set(defaultCorsHeaders)
  if ( req.method === 'GET' ) {
  }
  if ( req.method === 'OPTIONS') {
    console.log('optoins in here:');
    res.status(200)
  }
  next(JSON.stringify(chatterboxData))
  res.json(chatterboxData)
  console.log('Request URL:', req.originalUrl) // useful to keep here to confirm client URL
});

app.listen(3000, '127.0.0.1', function(a) {
  console.log('this is the seva-server, yay!');
});



