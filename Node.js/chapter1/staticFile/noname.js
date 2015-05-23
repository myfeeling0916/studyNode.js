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

	// console.log(cache);

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
	fs.stat(f, function(err, stats) {
		if (err) {
			return console.log('Oh no!, Eror', err);
		}
		var lastChanged = Date.parse(stats.ctime);
		var isUpdated = (cache[f]) && lastChanged > cache[f].timestamp;

		if (!cache[f] || isUpdated) {
			fs.readFile(f, function(err, data) {
				cache[f] = {
					content : data,
					timestamp : Date.now()
				};
				console.log('storing ' + f + ' from file');
				cb(err, cache[f].content);
				return;
			});
		} else {
			console.log('loading ' + f + cache[f].timestamp + ' from file');
			cb(err, cache[f].content);
			return;
		}

	});
}