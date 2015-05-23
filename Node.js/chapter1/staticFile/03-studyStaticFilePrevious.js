/**
 * Let's begin by looking at our following script from the previous recipe
 * Serving static files:
 */

var http = require('http');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
'.js' : 'text/javascript',
'.html': 'text/html',
'.css' : 'text/css'
};

http.createServer(function (request, response) {
	
	var lookup = path.basename(decodeURI(request.url)) || 'index.html';
	var f = 'content/'+lookup;
	
	fs.exists(f, function (exists) {
		if (exists) {
			fs.readFile(f, function(err,data) {
			if (err) {
				response.writeHead(500); response.end('Server Error!');
				return;
			}
			var headers = {'Content-type': mimeTypes[path.extname(lookup)]};
			response.writeHead(200, headers);
			response.end(data);
			});
			return;
		}
		response.writeHead(404); // no such file found!
		response.end('Page Not Found');
	});
}).listen(8080);