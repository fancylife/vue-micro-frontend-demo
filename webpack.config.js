"use strict";
let args = process.argv;
const DEBUG = args.indexOf('--debug') >= 0;
let baseConfig = require(`./config/webpack.${DEBUG ? 'dev' : 'product'}`);
module.exports = baseConfig;
