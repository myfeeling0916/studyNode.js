var http = require('http');
var option = {
		hostname: '127.0.0.1',
		port: 1337,
		path: '/',
		method: 'GET'
};

var req = http.request(option, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADRS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
				console.log(chunk);
		});
});

req.end();