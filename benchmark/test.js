var spawn = require('child_process').spawn;

process.env.slawek = 'janecki';

var child = spawn('node', ['test2.js'], {env:process.env});


child.stdout.on('data', function(data){
  console.log(data.toString());
});

child.stdin.on('data', function(data){
  console.log(data.toString());
});
setTimeout(function(){}, 2000);