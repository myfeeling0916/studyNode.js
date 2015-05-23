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
	
	/* TODO: listen fun 
	 * Fun: new createReadStream(fun)
	 * The preceding code will return a readStream object that streams the file, 
	 * which is pointed at by variable f. 
	 * The readStream object emits events that we need to listen to. 
	 * We can listen with addEventListener or use the shorthand on method as follows:
	 * 
	var s = fs.createReadStream(f).on('open', function() {
		//do stuff when the readStream opens
	});
	*/
	
	/* TODO: listen fun only one, catch try listen example.
	 * Because createReadStream returns the readStream object, 
	 * we can latch our event listener straight onto it using method chaining with dot notation. 
	 * Each stream is only going to open once; 
	 * we don't need to keep listening to it. Therefore, 
	 * we can use the once method instead of on to automatically stop listening after the first event 
	 * occurrence as follows:
	 * */
	
	var s = fs.createReadStream(f).once('open', function() {
		//do stuff when the readStream opens
	}).once('error', function(e) {
		//do stuff when the readStream opens
		//do process error/exception
		console.log(e);
		response.writeHead(500);
		response.end('Server Error!');
	});
	
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
	
	fs.stat(f, function (err, stats) {
		//console.log("========stat=========");
		if (err) { return console.log('Oh no!, Eror', err); }
		
//		console.log(stats.ctime);
		
		var lastChanged = Date.parse(stats.ctime);    
		var isUpdated = (cache[f]) && lastChanged  > cache[f].timestamp;
		
//		console.log('lastChanged-> ' + lastChanged );
//		console.log('isUpdated-> ' + isUpdated );
		
		if (!cache[f] || isUpdated) {
			
			fs.readFile(f, function(err, data) {
				if (!err) {
					cache[f] = {
						content : data,
						timestamp: Date.now()
					};
					
					console.log('loading ' + f + ' from server');
				}
				cb(err, data);
			});
			return;
		}
		console.log('loading ' + f + ' from cache');
		cb(null, cache[f].content);
	});
	
}