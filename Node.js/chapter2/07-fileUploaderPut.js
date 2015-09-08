/* TODO: 
 *  Browsers that will support this method are IE10 and above, 
 *  Firefox, Chrome, Safari, iOS 5+ Safari, and Android browsers.
 * */
console.log('fileUploaderPut');
var http = require("http");
var fs = require('fs');
var formidable = require("formidable");
var form = require('fs').readFileSync('07-fileUploaderPUT.html');
http.createServer( function(req, res) {
	if( req.method === "PUT" ) {
		var fileData = new Buffer(+req.headers['content-length']);
		var bufferOffset = 0;
		req.on('data', function(chunk) {
			chunk.copy(fileData, bufferOffset);
			bufferOffset += chunk.length;
		}).on('end', function() {
			var rand = (Math.random() * Math.random())
			.toString(16).replace('.','');
			
			var to = 'uploads/' + rand + "-" +
			req.headers['x-uploadedfilename'];
			
			fs.writeFile(to, fileData, function(err) {
				if(err) { throw err; }
				console.log('Save file to ' + to );
				res.end();
			});
		});
	}
	
	if( req.method === "GET" ) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(form);
	}
}).listen(8080);


