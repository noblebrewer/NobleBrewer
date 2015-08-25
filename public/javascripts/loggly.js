var winston = require('winston');
require('winston-loggly');
 
 winston.add(winston.transports.Loggly, {
    token: keystone.get('winston_api'),
    subdomain: "tradecrafted",
    tags: ["Winston-NodeJS"],
    json:true
});

winston.log('info',"Hello World from Node.js!");