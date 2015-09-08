/* TODO: 
 * 
 * */

var http = require("http");
var formidable = require("formidable");
var form = require('fs').readFileSync('05-fileUploader.html');
http.createServer( function(req, res) {
	if (req.method === "POST") {
		var icoming = new formidable.IncomingForm();
		icoming.uploadDir = 'uploads';
		icoming.on('file', function( field, file ) {
			console.log( file.size );
			if( file.size === 0 ) {
				console.log('file size is 0');
				return; 
			}
			res.write(file.name + ' received\n');
		}).on('field', function( field, value ) {
			console.log('field');
			res.write( field + ' : ' + value + '\n');
		}).on('end', function(){
			res.end('All files received');
		});
		
		icoming.parse(req);
	}
	
	if( req.method === 'GET' ) {
		res.writeHead(200, {'Contnet-Type': 'text/html'});
		res.end(form);
	}
}).listen(8080);


