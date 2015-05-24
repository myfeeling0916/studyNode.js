/* TODO: POST DATA TO SERVER AND RESPONSE DATA TO CLIENT
 * 
 * */


var http = require("http");
var querystring = require('querystring');
var util = require("util");
var form = require("fs").readFileSync("form.html");
var maxData = 2 * 1024 * 1024; //2mb, server maximum data size

http.createServer(function (request, response){
	
	if ( request.method === 'GET' ) {
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.end(form);
		
	}else if ( request.method === 'POST' ) {
		var postData = '';
		request.on('data', function (chunk) {
			postData += chunk;
			
			/* TODO: CHECKED POST DATA SIZE
			 * */
			if(postData.length > maxData ) {
				postData = '';
				this.destroy();
				response.writeHead(413)	//Request Entity Too Large
				response.end('Too large');
			}
			
		}).on('end', function() {
			
			if(!postData) { response.end();	return; };	//prevents empty post  
			
			var postDataObject = querystring.parse(postData);
			console.log( 'User Posted: \n ' + postData );
			response.end( '<h1>You Posted: </h1>\n <h2>' + util.inspect(postDataObject) + '</h2>');
		});
		
	}else {
		
		request.on('end', function() {
			response.end( '<h1>Server Error</h1>');
		})
	}
}).listen(8080);
