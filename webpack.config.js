//https://www.gitbook.com/book/toobug/webpack-guide
var path = require('path');
var webpack = require('webpack');
var loadersByExtension = require('./loadersByExtension');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var config = require('./config');

/* constants */
var additionalLoaders = [];
var aliasLoader = {};
var externals = [];

var options = config.webpack.options;

var modulesDirectories = ['web_modules', 'node_modules'];
var extensions = ['', '.web.js', '.js', '.jsx'];
var root = path.join(__dirname, 'src');
var alias = {};

console.log(`the __dirname is ${__dirname}`);
console.log(`the root is ${root}`);

var publicPath = options.devServer ? 'http://localhost:' + options.devPort + '/_assets/' : '/static/';

/* app list */
var entry = {
    //rawjs
    main: './src/main.js',
    router: './src/Router.js',
};

/* all loaders but stylesheets */
var loaders = {
    'js': {
        loader: 'babel-loader',
        include: path.join(__dirname, 'src')
    },
    'json': 'json-loader',
    'coffee': 'coffee-redux-loader',
    'json5': 'json5-loader',
    'txt': 'raw-loader',
    'png|jpg|jpeg|gif|svg': 'url-loader?limit=10000',
    'woff|woff2': 'url-loader?limit=100000',
    'ttf|eot': 'file-loader',
    'wav|mp3': 'file-loader',
    'html': 'html-loader',
    'md|markdown': ['html-loader', 'markdown-loader']
};

/* raw stylesheets loaders */
var cssLoader = options.minimize ? 'css-loader!postcss-loader' : 'css-loader?localIdentName=[path][name]---[local]---[hash:base64:5]!postcss-loader';
var stylesheetLoaders = {
    'css': cssLoader,
    'less': [cssLoader, 'less-loader'],
    'styl': [cssLoader, 'stylus-loader'],
    'scss|sass': [cssLoader, 'sass-loader']
};
/* to build raw css loaders */
Object.keys(stylesheetLoaders).forEach(function (ext) {
    var sl = stylesheetLoaders[ext];
    if (Array.isArray(sl)) sl = sl.join('!');
    stylesheetLoaders[ext] = 'style-loader!' + sl;
});

/* webpack output */
var output = {
    path: path.join(__dirname, 'static'),
    publicPath: publicPath,
    filename: '[name].js' + (options.longTermCaching ? '?[chunkhash]' : ''),
    chunkFilename: (options.devServer ? '[id].js' : '[name].js') + (options.longTermCaching ? '?[chunkhash]' : ''),
    sourceMapFilename: 'debugging/[file].map',
    pathinfo: options.debug
};
var excludeFromStats = [
    /node_modules[\\\/]react(-router)?[\\\/]/,
];

var plugins = [];

if (options.minimize) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.NoErrorsPlugin()
    );
}

if (options.hot) {
    //for node.js mode, same as --hot --inline of CLI mode
    Object.keys(entry).forEach(function (key) {
        entry[key] = [entry[key], 'webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:' + options.devPort];
    });
    plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
    entry: entry,
    output: output,
    target: 'web',
    module: {
        loaders: additionalLoaders
            .concat(loadersByExtension(loaders))
            .concat(loadersByExtension(stylesheetLoaders).map(function (loader) {
                return loader;
            }))
    },
    postcss: function () {
        return [precss, autoprefixer];
    },
    devtool: options.devtool,
    debug: options.debug,
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
        alias: aliasLoader
    },
    externals: externals,
    resolve: {
        root: root,
        modulesDirectories: modulesDirectories,
        extensions: extensions,
        alias: alias
    },
    plugins: plugins,
    profile: true,
    //pass to webpack-dev-server
    devServer: {
        hot: true,
        //the same with output.publicPath
        publicPath: publicPath,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        stats: {
            colors: true
        }
    },
    //configuration of stats.toJSON()
    statsConf: {
        chunkModules: true,
        excludeFromStats: excludeFromStats
    },
    devPort: options.devPort
};
