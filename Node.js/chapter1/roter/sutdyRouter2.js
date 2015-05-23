var http = require("http");
var url = require('url');
var pages = [ {
	id : '1',
	route : '',
	output : 'Woohoo!'
}, {
	id : '2',
	route : 'about',
	output : 'A simple routing with Node      example'
}, {
	id : '3',
	route : 'another page',
	output : function() {
		return 'Here\'s ' + this.route;
	}
}, ];

http.createServer(
		function(request, response) {
//			console.log("==================");
//			console.log("request ulr=> " + request.url);
//			console.log("decodeURI(request.url)=> " + decodeURI(request.url) );
//			console.log("url.parse(decodeURI(request.url), true)=> " + url.parse(decodeURI(request.url), true));
			var id = url.parse(decodeURI(request.url), true).query.id;
			var name = url.parse(decodeURI(request.url), true).query.name;
//			console.log("id=> " + id);
//			console.log("name=> " + name);
			
			/* .query function is search url name
			 * */
			
			if (id) {
				pages.forEach(function(page) {
					if (page.id === id) {
						response.writeHead(200, {
							'Content-Type' : 'text/html'
						});
						response.end(typeof page.output === 'function' ? page
								.output() : page.output);
					}
				});
			}
			if (!response.finished) {
				response.writeHead(404);
				response.end('Page Not Found');
			}
		}).listen(8080);
