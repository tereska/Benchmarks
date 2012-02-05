var http = require('http');
http.createServer(function (req, res) {
console.log('REQ');  
res.writeHead(200, {
'Expires':'Thu Jan 01 2012 01:00:00 GMT+0100'
}

);
res.end('Hello');
}).listen(81);
