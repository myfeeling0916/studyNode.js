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
	
//	console.log( 's f-> ' + f );
	
	// console.log(cache);
	
	fs.exists(f, function(exists) {
//		console.log( 'fs f-> ' + f );
		if (exists) {
			
			var headers = {'Content-type': mimeTypes[path.extname(f)]};
			
			if (cache[f]) {
				response.writeHead(200, headers);
				response.end(cache[f].content);
				return;
			}
			
			/* This is run only one function */
			/* TODO: add buffer Size attr.
			 * We can change the buffer size of our readStream object by passing an 
			 * options object with a bufferSize property as the second parameter of fs.createReadStream. 
			 * */
			var s = fs.createReadStream(f,{'bufferSize': 124 * 1024}).once('open', function() {
				//do stuff when the readStream opens
				response.writeHead(200);
				this.pipe(response);
			}).once('error', function(e) {
				//do stuff when the readStream opens
				//do process error/exception
				console.log(e);
				response.writeHead(500);
				response.end('Server Error!');
			});
			
			fs.stat(f, function(err, stats) {
				
				var bufferOffset = 0;
				cache[f] = {content: new Buffer(stats.size)};
				
				s.on('data', function(chunk) {
					console.log('bufferOffset-> ' + bufferOffset);
					chunk.copy(cache[f].content, bufferOffset);
					bufferOffset += chunk.length;
				});
				
			});	//end of createReadStream
			
		}
	});
}).listen(8080);