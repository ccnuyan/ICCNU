var stats = require('./stats.js');
var dependencies = {
    css: [
        '//cdn.bootcss.com/normalize/3.0.3/normalize.min.css',
        '//cdn.bootcss.com/pure/0.6.0/pure-min.css',
        '//cdn.bootcss.com/reveal.js/3.3.0/css/reveal.min.css',
    ],
    js: [
        '//cdn.bootcss.com/modernizr/2.8.3/modernizr.min.js',
        '//cdn.bootcss.com/es6-promise/4.0.2/es6-promise.min.js',
        '//cdn.bootcss.com/fetch/1.0.0/fetch.min.js',
        '//cdn.bootcss.com/classlist/2014.01.31/classList.min.js',
        '//cdn.bootcss.com/jquery/1.9.1/jquery.min.js',
        `${stats.publicPath}${stats.assetsByChunkName.router}`,
        `${stats.publicPath}${stats.assetsByChunkName.main}`
    ],
}

console.log(JSON.stringify(dependencies,null,2));
module.exports = dependencies;
