/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

const url2 = require('url');
var qs = require('querystring');

var responseData = {results:[]};

var objectIdCount = 0;

var requestHandler = function(request, response) {
  var stringData = '';
  var statusCode = 200;
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var endPoint = url2.parse(request.url).pathname;

  var pathName = '/classes/messages';

  var room = '/classes/room';

  if ( endPoint !== pathName ) {
    statusCode = 404;
  }

  if ( request.method === "GET" && endPoint === pathName || endPoint === room ) {
    statusCode = 200;
    // console.log(request);
    // console.log(url2.parse(request.url, true));
    console.log('YUUUUU wins')
    console.log(responseData);
  }
  if ( request.method === "POST" && endPoint === pathName || endPoint === room ) {
    statusCode = 201;

    console.log('YUUUUU loses (post)');
    // first find data property on request
    // parse the string
    // add the objet/string to our data
      let body = [];
      request.on('error', (err) => {
        console.error(err);
      }).on('data', (chunk) => {
        // console.log(' inside data. arguemnts!!!!;',arguments);
        body.push(chunk);
        // console.log('chunck!!!!!',chunk.toString()); // if this is a longer obj need on 'end'
      }).on('end', () => {
        // console.log('arguemnts!!!!;',arguments);
        console.log('request.data',request.data);
        body = Buffer.concat(body).toString();
        // body = body.join(',').toString();
        // console.log('testBody!!!',testBody);
        // body = '/?' + body;

        // console.log('using url2',require('url').parse(body, true));

        // objectId, createdAt
        // console.log('before parse', typeof body);
        obj = JSON.parse(body);
        // response.end(JSON.stringify(obj));
        // console.log('after parse',typeof body);

        // var obj = qs.parse(body);

        // console.log('type!!!', obj);

        obj.objectId = objectIdCount++;
        obj.createdAt = new Date().toISOString();

        responseData.results.push(obj);
        console.log('inside post',responseData);

      })
  }

  // response.statusCode = 404


  // CHECK TYPE OF REQUEST (GET/POST/PUT)
  // CHANGE STATUS CODE PER
  // IF GET THEN RESPONSE.END SHOULD BE RESPONDIND W RESPONSEDATA
    // IF POST THEN NEED TO GET THE DATA AND PUT IN OBJECT

  // The outgoing status.
  

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'application/json'; //CHANGE TYPE

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
    response.end(JSON.stringify(responseData));  // PASS IN OBJECT
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};


// module.exports = requestHandler;
module.exports.requestHandler = requestHandler;

// exports.requestHandler = requestHandler;



// look up why .end breaks if put in a conditional
// read code for piping above
// 
