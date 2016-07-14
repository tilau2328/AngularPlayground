var routes = [];

routes.push.apply(routes, require('./artists'));
routes.push.apply(routes, require('./bands'));
routes.push.apply(routes, require('./albums'));
routes.push.apply(routes, require('./tracks'));

module.exports = routes;