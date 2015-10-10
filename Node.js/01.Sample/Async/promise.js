/*
 *	理想的程式設計體驗應該是前一次呼叫的結果作為下一次叫用的開始，
 *	因此印象中的練結式呼叫，相關程式碼如下:
**/
promise()
	.then(obj.api1)
	.then(obj.api2)
	.then(obj.api3)
	.then(obj.api4)
	.then(function(value4) {
		// Do something with value4
	}), function(error) {
		// Handle any error from step1 through step4
	})
	.done();

/* 
 *	嘗試改造一下程式碼，
 *	以便實作鏈結式呼叫，
 *	具體如下所示:
**/

var Deferred = function() {
	this.promise = new Promise();
}

//完成狀態
Deferred.prototype.resolve = function (obj) {
	var promise = this.promise;
	var handler;
	while ((handler = promise.queue.shift())) {
		if (handler && handler.fulfilled) {
			var ret = handler.fulfilled(obj);
			if (ret && ret.isPromise) {
				ret.queue = promise.queue;
				this.promise = ret;
				return;
			}
		}
	}
}

//失敗狀態
Deferred.prototype.reject = function(err) {
	var promise = this.promise;
	var handler;
	while ((handler = promise.queue.shift())) {
		if (handler && handler.error) {
			var ret = handler.error(err);
			if (ret && ret.isPromise) {
				ret.queue = promise.queue;
				this.promise = ret;
				return;
			}
		}
	}
}

//產生回呼函數
Deferred.prototype.callback = function() {
	var that = this;
	return function (err, file) {
		if(err) {
			return that.reject(err);
		}
		that.resolve(file);
	}
}

var Promise = function() {
	// 序列用來儲存待執行的回乎函數
	this.queue = [];
	this.isPromise = true;
}

Promise.prototype.then = function(fulfilled, errorHandler, progressHandler) {
	var handle = {};
	if (typeof fulfilledHandler === 'function') {
		handle.fulfilled = fulfilledHandler;
	}
	if (typeof errorHandler === 'function') {
		handle.fulfilled = errorHandler;
	}
	this.queue.push(handle);
	return this;
}

/*
 *	這以兩次檔案讀取作為例子，藉由驗證設計的可行性。
 *	假設第二個檔案的讀取依賴於第一個檔案的內容，相關程式碼如下:
**/

var readFile1 = function(file, encoding) {
	var deferred = new Deferred();
	fs.readFile(file, encoding, deferred.callback());
	return deferred.promise;
}
var readFile2 = function(file, encoding) {
	var deferred = new Deferred();
	fs.readFile(file, encoding, deferred.callback());
	return deferred.promise;
}

readFile1('file1.txt', 'utf8')
	.then(function(file1) {
		return readFile2(file1.trim(), 'utf8');
	}).then(function (file2) {
		console.log(file2);
	});

/*
 *	API Promise
 *	為了體驗更好的API，此刻需要進行更多的準備工作。
 *	這裡提供一個方法可以批次將方法Promise化，相關程式如下：
**/

// smooth(fs.readFile);
var smooth = function (method) {
	return function() {
		var deferred = new Deferred();
		var args = Array.prototype.slice.call(arguments, 1);
		args.push(deferred.callback());
		method.apply(null, args);
		return deferred.promise;
	};
};

// 於是在promise.js中的readFile1, readFile2 可以簡化為:
var readFile = smooth(fs.readFile);
readFile('file.txt', 'utf8').then(function(file1) {
	return readFile(file1.trim(), 'utf8');
}).then(function(file2) {
	// file2 => I am file2
	console.log(file2);
});