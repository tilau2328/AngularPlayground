const Path = require('path');
const Music = require(Path.join(__dirname, "..", "utils", "music"));

// Handlers

const getAllInfoHandler = function(){
    
};

// Routes

const getAllInfo = {
    config: {
        handler: getAllInfoHandler
    }
};

var routes = [ getAllInfo ];

routes.push.apply(routes, require('./bands'));
routes.push.apply(routes, require('./artists'));
routes.push.apply(routes, require('./albums'));
routes.push.apply(routes, require('./tracks'));

module.exports = routes;