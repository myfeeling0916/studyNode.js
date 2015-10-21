var http = require('http');
/*
 * {host} - domain name. default localhost.
 * {hostname} - server name.
 * {port} - server port. default 80.
 * {localAddress} - create network connection local network adapter.
 * {socketPath} - domain socket path.
 * {method} - HTTP connection method. defalut GET.
 * {path} - request path. defalut /.
 * {headers} - request headers
 * {auth} - Basic Authentication
**/
var option = {
	hostname: '127.0.0.1',
	port: 2222,
	path: '/',
	method: 'GET'
};

var req = http.request(option, function(res) {
	console.log('STATUS: ' + res.statusCode);
	console.log('HEADERS: ' + JSON.stringify(res.headers));
	res.setEncoding('utf8');
	res.on('data', function(chunk) {
		console.log(chunk);
	});
});

console.log('running server 127.0.0.1:2222');
req.end();