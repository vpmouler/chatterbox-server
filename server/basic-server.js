/* Import node's http module: */
var http = require('http');
// var handleRequest = require('./request-handler').requestHandler
var url = require('url');

var express = require('express')
var app = express()

var responseData = {results:[{
  text: 'this is the text from express',
  username: 'yotta!',
  roomname: 'lobby'
}]};

// app.use(allowCrossDomain);

// var defaultCorsHeaders = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10 // Seconds.
// };

app.get('/classes/messages', function(request,response) {

  response.status(200).json(responseData)
  // console.log('inside get of express', request.method);
})

app.post('/classes/messages', (request,response) => {
  response.header(defaultCorsHeaders)
  response.send('in the post!!')
  console.log('inside post of express');
})

// app.options('/classes/messages', (request,response) => {
//   // request.header('Access-Control-Allow-Origin', '*');
//   // request.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   // request.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//   response.status(200).send(JSON.stringify({}));
// })


var server = http.createServer(app)

/*
app.use(app.router); 
app.use(express.static(__dirname + '/public'));
*/



// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// ports are 8080 and 1337.
var port = 3000;

// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.
var ip = '127.0.0.1';


// We use node's http module to create a server.
//
// The function we pass to http.createServer will be used to handle all
// incoming requests.
//
// After creating the server, we will tell it to listen on the given port and IP. */
// var server = http.createServer(handleRequest);
console.log('Listening on http://' + ip + ':' + port + 'SEVA this is URL module:' + url);
server.listen(port, ip);



// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.

