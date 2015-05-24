/* TODO: 
 * 
 * */

var http = require("http");
//var connect = require('connect');
var getRawBody = require('raw-body')
var bodyParser = require('body-parser');
var util = require('util');
var form = require('fs').readFileSync('form.html');
http.createServer( function(request, response) {
	
		if (request.method === "POST") {
			getRawBody(request, {limit: '2mb'}, function(err, string){
				console.log('User Posted:\n', request.body);
				response.end('You Posted:\n' + util.inspect(request.body));
			});	
		}
		if (request.method === "GET") {
			response.writeHead(200, {
				'Content-Type' : 'text/html'
			});
			response.end(form);
		}
	
}).listen(8080);


