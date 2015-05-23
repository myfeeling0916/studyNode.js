var path = require("path");

//return \foo\bar\baz\asdf\quux\...
//console.log(
//	path.normalize("/foo/bar//baz/asdf/quux/...")
//);


//var pathArr = ['/foo', 'bar', 'baz/asdf', 'quux', '..'];

//return TypeError: Arguments to path.join must be strings
//console.log(
//	path.join(pathArr)
//);

//return \foo\bar\baz\asdf
//console.log(
//	path.join('/foo', 'bar', 'baz','asdf', 'quux', '..')
//);

//return D:\tmp\subfile
//console.log(
//	path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')
//);



//console.log(
////		path.isAbsolute('/foo/bar') // true
////		path.isAbsolute('/baz/..')  // true
////		path.isAbsolute('qux/')     // false
////		path.isAbsolute('.')        // false
//);

// Windows run
//console.log(
////	path.isAbsolute('//server')  // true
////	path.isAbsolute('C:/foo/..') // true
////	path.isAbsolute('bar\\baz')   // false
////	path.isAbsolute('.')         // false
//);

//console.log(
////	path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb')	//  ..\\..\\impl\\bbb
////	path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')	//	'../../impl/bbb'
//);

//return /foo/bar/baz/asdf
//console.log(
//	path.dirname('/foo/bar/baz/asdf/quux')
//);


//console.log(
////	path.basename("/1/2/3/4/5/6/7/8/9/index.html")	//return index.html
////	path.basename("/1/2/3/4/5/6/7/8/9/index.html", ".html")	//if @b praram is true return index, if @b param is false return index.html
//);

//console.log(
////	path.extname("index.html")			//.html
////	path.extname("index.coddee.md")		//.md
////	path.extname("index")				//''
//);

//console.log(
////	'foo/bar/baz'.split(path.sep)	//Return Array Object, [ 'foo/bar/baz' ]
//);

//console.log(
//	process.env.Path
//	/*
//	 * C:\Program Files (x86)\NVIDIA Corporation\PhysX\Common;
//	 * C:\Program Files (x86)\Common Files\NetSarang;
//	 * C:\ProgramData\Oracle\Java\javapath;
//	 * C:\Python27;
//	 * C:\Python27\Scripts\;
//	 * C:\Program Files (x86)\Intel\iCLS Client\;
//	 * C:\Program Files\Intel\iCLS Client\;
//	 * C:\Windows\system32;
//	 * C:\Windows;
//	 * C:\Windows\System32\Wbem;
//	 * C:\Windows\System32\WindowsPowerShell\v1.0\;
//	 * C:\Program Files\Intel\Intel(R) Management Engine Components\DAL;
//	 * C:\Program Files\Intel\Intel(R) Management Engine Components\IPT;
//	 * C:\Program Files (x86)\Intel\Intel(R) Management Engine Components\DAL;
//	 * C:\Program Files (x86)\Intel\Intel(R) Management Engine Components\IPT;
//	 * C:\Program Files\Acer\Remote Files\;
//	 * C:\Program Files (x86)\Git\cmd;
//	 * C:\Program Files (x86)\Skype\Phone\;
//	 * C:\Program Files\nodejs\;C:\Users\TUTK\AppData\Roaming\npm
//	 * */
//);

//console.log(
//	process.env.PATH.split(path.delimiter)
//	/*[ 
//	 * 'C:\\Program Files (x86)\\NVIDIA Corporation\\PhysX\\Common',
//	 * 'C:\\Program Files (x86)\\Common Files\\NetSarang',
//	 * 'C:\\ProgramData\\Oracle\\Java\\javapath',
//	 * 'C:\\Python27',
//	 * 'C:\\Python27\\Scripts\\',
//	 * 'C:\\Program Files (x86)\\Intel\\iCLS Client\\',
//	 * 'C:\\Program Files\\Intel\\iCLS Client\\',
//	 * 'C:\\Windows\\system32',
//	 * 'C:\\Windows',
//	 * 'C:\\Windows\\System32\\Wbem',
//	 * 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\',
//	 * 'C:\\Program Files\\Intel\\Intel(R) Management Engine Components\\DAL',
//	 * 'C:\\Program Files\\Intel\\Intel(R) Management Engine Components\\IPT',
//	 * 'C:\\Program Files (x86)\\Intel\\Intel(R) Management Engine Components\\DAL',
//	 * 'C:\\Program Files (x86)\\Intel\\Intel(R) Management Engine Components\\IPT',
//	 * 'C:\\Program Files\\Acer\\Remote Files\\',
//	 * 'C:\\Program Files (x86)\\Git\\cmd',
//	 * 'C:\\Program Files (x86)\\Skype\\Phone\\',
//	 * 'C:\\Program Files\\nodejs\\',
//	 * 'C:\\Users\\TUTK\\AppData\\Roaming\\npm' ]
//	 * */
//);

//console.log(

//	/*
//	 * { root: '/',
//	 * dir: '/home/user/dir',
//	 * base: 'file.txt',
//	 * ext: '.txt',
//	 * name: 'file' }
//	 * */

//	path.parse("/home/user/dir/file.txt")
//);

//console.log(
//	path.format({		//Return  /home/user/dir\file.txt
//	    root : "/",
//	    dir : "/home/user/dir",
//	    base : "file.txt",
//	    ext : ".txt",
//	    name : "file"
//	})
//);

