var http = require('http');

var app1 = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hello World</h1>');
    res.end();
});

app1.listen(3000, "localhost");
console.log('http exec');