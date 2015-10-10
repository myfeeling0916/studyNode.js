/*
 *	momory leak simulation example code
 *	step.1	you can running the sample code
 *	step.2	use curl tool simulation user connection
 *	step.3 	npm install heapdump
 *	step.4 	use the command $ kill -USR2 <pid>
**/

var heapdump = require("heapdump");

var leakArray = [];
var leak = function () {
	leakArray.push("leak" + Math.random());
};
http.createServer(function(req, res) {
	leak();
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(1337);
console.log('Server running at http://127.0.0.1:1337');