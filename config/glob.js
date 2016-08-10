/**
 * Created by kevin on 16/6/22.
 */
const conf = require('./conf');
let path = require('path');
//日志记录
const logger = require('mini-logger');
//moment时间
const moment = require('moment');

let log = logger(conf.log);
global.log = log;
// console.log('global-log');
global.path = path;
// console.log('global-path');
global.moment = moment;


module.exports = {
    log: log,
    path: path,
    moment: moment
}