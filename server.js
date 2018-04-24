/*
* @file: server.js
* @description: This is the main server.js file to handle the int operations of the server.
* @date: 23/04/2018
* @author: Nitin Padgotra
* */

'use strict';


// requiring external modules
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

// requiring all custom modules
const configs = require('./configs');
const env = require('./env');

const app = configs.app[env.instance];

const server = new Hapi.Server({
    host: app.host,
    port: app.port,
    routes: {
        cors: true
    }
});


// gathering all application routes
var payslipRoutes = require('./slipGenerator');

server.route(payslipRoutes);


// init the index route
server.route([{
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return {
            name: app.name,
            endpoint: app.host,
            port: app.port

        };
    }
}]);


const swaggerOptions = {
    info: {
        title: 'PaySlip Generator Documentation',
        version: '1.0.0'
    },
    pathPrefixSize: '2',
    basePath: '/v1'
};


const init = async () => {

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    await  server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
process.exit(1);
});



init();