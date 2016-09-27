var statsOutput = './build/';
var argv = require('yargs').argv;
var path = require('path');

if (argv.dev) {
    module.exports = {
        title: 'DEV',
        maxDelay: 100,
        port: 8080,
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
                devPort: 8080,
                copy: false,
            }
        }
    };
} else if (argv.prod) {
    module.exports = {
        title: 'ICCNU',
        maxDelay: 0,
        port: 8080,
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
