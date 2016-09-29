var statsOutput = './build/';
var argv = require('yargs').argv;
var path = require('path');

if (argv.dev) {
    module.exports = {
        title: 'DEV',
        maxDelay: 100,
        //front end server port - dev
        port: 10000,
        dev: true,
        webpack: {
            statsOutput: path.join(__dirname, `${statsOutput}dev.stats.json`),
            options: {
                devServer: true,
                devtool: 'eval-source-map',
                debug: true,
                minimize: false,
                hot: true,
                longTermCaching: false,
                //wp-port
                devPort: 8080,
                copy: false,
            }
        }
    };
} else if (argv.prod) {
    module.exports = {
        title: 'ICCNU',
        maxDelay: 0,
        //front end server port - pord
        port: 8000,
        dev: false,
        webpack: {
            statsOutput: path.join(__dirname, `${statsOutput}build.stats.json`),
            options: {
                minimize: true,
                hot: false,
                longTermCaching: true,
                copy: true,
            }
        }
    };
} else {
    console.error('no mode parameter provided!');
    process.exit();
};
