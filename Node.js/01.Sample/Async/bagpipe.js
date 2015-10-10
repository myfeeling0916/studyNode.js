
/*
 *	Node.js 可以十分方便的利用非同步發起並行呼叫
**/
for (var i = 0; i < 100; i++) {
	async();
}

/*
 *	對非同步的API做超載保護
 *	# [i] 透或序列控制併發量
 *	# [i] 如果目前運作中(運作但未執行回呼)的非同步呼叫量小於限定值，則從序列中取出並執行。
 *	# [i] 如果作用中的呼叫量達到限定值，則暫時存放在序列中。
 *	# [i] 結束每個非同步呼叫後，從序列取出新的非同步呼叫並執行。
**/
var Bagpipe = require("bagpipe");
var bagpipe = new Bagpipe(10);
for(var i = 0; i < 100; i++) {
	bagpipe.push(async, function () {
		//	非同步回呼執行
	});
}

bagpipe.on('full', function(length) {
	console.warn('底層系統處理無法及時完成，序列阻塞，目前序列長度為: ' + length);
});
