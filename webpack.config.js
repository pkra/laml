const path = require('path');

const browser = {
    name: 'browser',
    entry: './src/worker.js',
    output: {
        path: __dirname + '/dist',
        filename: 'laml-browser.js'
    }
};

module.exports = browser;

const node = {
    name: 'node',
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'laml-node.js'
    }
};


// module.exports = [browser, node];
