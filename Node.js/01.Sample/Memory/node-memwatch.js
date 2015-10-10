var memwatch = require("memwatch");
memwatch.on('leak', function(info) {
	console.log('leak');
	console.log(info);
});

memwatch.on('status', function(status) {
	console.log('status');
	console.log(status);
});

var http = require('http');
var leakArray = [];
var leak = function() {
	leakArray.push(<<leak>> + Math.random());
};

http.createServer(function (req, res) {
	leak();
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(1337);

console.log('Server running at http://127.0.0.1:1337');

/*
 *	在處理程序使用node-memwatch之後，每次Garbage collection 都會觸發一次status
 *
 *	{
		num_full_gc: 4,				//	第幾次完整垃圾回收
		num_inc_gc: 23, 			// 	第幾次增量式垃圾回收
		heap_compactions: 4,		// 	第幾次對舊生代進行整理
		usage_trend: 0,				//	使用趨勢
		estimated_base: 7152944,	//	預估基數
		current_base: 7152944,		//	當前基數
		min: 6720766,				//	最小值
		max: 7152944				//	最大值
 	}
 *
**/