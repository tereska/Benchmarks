var http = require('http');

var cb = function(req, res){
  res.end('PONG');
}

http.createServer(cb).listen(3000, "127.0.0.1");
