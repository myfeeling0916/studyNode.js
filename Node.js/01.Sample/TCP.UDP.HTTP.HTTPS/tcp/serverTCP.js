var net = require("net");
var server = net.createServer(function(socket) {
	//new connection
	socket.on('data', function(data) {
		socket.write("Hello");
	});
	socket.on('end', function() {
		console.log('kill connection');
	});
	socket.write('Hello Node.js\n');
});

// socket running listen port 8999
server.listen(8999, function() {
	console.log('server bound');
});

// listen each connection
server.on('connection', function(socket) {
	// new connection
	console.log('new connection');
});