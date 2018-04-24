/*
 * @file: appConstants.js
 * @description: All major application constants are defined here
 * @date: 23/04/2018
 * @author: Nitin Padgotra
 * */

var applicationName = "PaySlip Generator";


module.exports = {

    local: {
        name: applicationName,
        host: '127.0.0.1',
        port: 3001,
        debug: true
    },
    dev: {
        name: applicationName,
        host: '',
        port: '',
        debug: true
    },
    test: {
        name: applicationName,
        host: '',
        port: '',
        debug: true
    },
    live: {
        name: applicationName,
        host: '',
        port: '',
        debug: true
    }

};