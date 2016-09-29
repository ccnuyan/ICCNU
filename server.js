var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var argv = require('yargs').argv;

var config = require('./config.js')
var Renderer = require('./renderer.js');

var server = http.createServer(app);

var renderer = new Renderer();

if (argv.prod) {
    //prod server: server the compiled js files
    app.use('/static', express.static(path.join(__dirname, 'static')));
}

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

server.listen(config.port, function () {
    console.log('Express server listening on config.port ' + config.port);
});
