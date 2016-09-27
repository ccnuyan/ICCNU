var express = require('express');
var http = require('http');
var Renderer = require('./renderer.js');

var renderer = new Renderer();
var port = 8000;

var app = express();
var server = http.createServer(app);

app.get('/*', function (req, res, next) {
    renderer.render(function (err, html) {
        if (err) {
            res.statusCode = 500;
            res.contentType = 'text/html; charset=utf8';
            res.end(err.message);
            return;
        }
        res.contentType = 'text/html; charset=utf8';
        res.end(html);
    });
});

server.listen(port, function () {
    console.log('Express server listening on port ' + port);
});
