// create web server

var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

http.createServer(function(req, res) {
  var q = url.parse(req.url, true);
  if (q.pathname === '/comment') {
    if (req.method === 'POST') {
      var body = '';
      req.on('data', function(data) {
        body += data;
      });
      req.on('end', function() {
        var post = qs.parse(body);
        fs.appendFile('comments.txt', post.comment + '\n', function(err) {
          if (err) throw err;
          console.log('Comment saved');
        });
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('Comment saved');
        res.end();
      });
    } else {
      res.writeHead(405, {'Content-Type': 'text/html'});
      res.write('Method not allowed');
      res.end();
    }
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write('Not found');
    res.end();
  }
}).listen(8080);



console.log('Server started at http://localhost:8080/');