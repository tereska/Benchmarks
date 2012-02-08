var http = require('http');

var data = Array(30001).join("0");
var bin = new Buffer(data);

var cb = function(req, res){
  res.writeHead(200, {'Content-Length': 30000});
  res.end(bin);
};

http.createServer(cb).listen(8081);

