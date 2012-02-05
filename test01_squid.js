var http = require('http');

var data = Array(30001).join("0");
var bin = new Buffer(data);

var cb = function(req, res){
  res.writeHead(200, {'Content-Length': 30000, 'Expires':'Sun, 09 Feb 2014 23:46:33 GMT', 'Content-Type':'text/html'});
  res.end(bin);
  console.log(new Date());
};

http.createServer(cb).listen(8080);

