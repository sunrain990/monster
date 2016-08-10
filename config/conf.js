/**
 * Created by kevin on 16/6/22.
 */
const path = require('path');
let log = {
    dir: path.join(__dirname,'..', 'log'),
    categories:['router','model','controller'],
    format:'YYYY-MM-DD-[{category}][.log]'
};

let conf = {
    log: log
}

module.exports = conf;