var http = require('http');
var path = require('path');
var fs = require('fs');
var cache = {};

var mimeTypes = {
	'.js' : 'text/javascript',
	'.html' : 'text/html',
	'.css' : 'text/css'
};

http.createServer(function(request, response) {
	var lookup = path.basename(decodeURI(request.url)) || 'index.html';
	var f = 'content/' + lookup;
	
	//console.log(cache);
	
	fs.exists(f, function(exists) {
		if (exists) {
			cacheAndDeliver(f, function(err, data) {
				if (err) {
					response.writeHead(500);
					response.end('Server Error!');
					return;
				}
				var headers = {
					'Content-type' : mimeTypes[path.extname(f)]
				};
				response.writeHead(200, headers);
				response.end(data);
			});
			return;
		}
	});
}).listen(8080);

function cacheAndDeliver(f, cb) {
	if (!cache[f]) {
		fs.readFile(f, function(err, data) {
			if (!err) {
				cache[f] = {
					content : data,
					timestamp: Date.now()
				};
			}
			cb(err, data);
		});
		return;
	}
	console.log('loading ' + f + ' from cache');
//	console.log(cache);
//	console.log("=========================");
	cb(null, cache[f].content);
}