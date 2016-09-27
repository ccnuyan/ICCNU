var fs = require('fs');
var path = require('path');
var dependencies = require('./dependencies');

var html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8');
var config = require('./config');

var Renderer = function () { };

Renderer.prototype.render = function (callback) {
    if (this.html) {
        return callback(null, this.html);
    }
    this.html = html;
    this.html = this.html.replace('__TITLE__', config.title);

    this.html = this.html.replace('__JS__', JSON.stringify(dependencies.js));
    this.html = this.html.replace('__CSS__', JSON.stringify(dependencies.css));

    return callback(null, this.html);
};

module.exports = Renderer;
