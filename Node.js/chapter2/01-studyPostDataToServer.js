/* TODO: POST DATA TO SERVER AND RESPONSE DATA TO CLIENT
 * 
 * */


var http = require("http");
var form = require("fs").readFileSync("form.html");
http.createServer(function (request, response){
	if ( request.method === 'GET' ) {
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.end(form);
	}else if ( request.method === 'POST' ) {
		var postData = '';
		request.on('data', function (chunk) {
			postData += chunk;
		}).on('end', function() {
			console.log( 'User Posted: \n ' + postData );
			response.end( '<h1>You Posted: </h1>\n <h2>' + postData + '</h2>');
		});
	}else {
		request.on('end', function() {
			response.end( '<h1>Server Error</h1>');
		})
	}
}).listen(8080);
