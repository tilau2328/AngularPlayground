// server.js

'use strict';

const Path = require("path");
const Hapi = require('hapi');
const Utils = require(Path.join(__dirname, 'api', 'projects', 'utils', 'projects'));
const secret = 'secretkey';

const server = new Hapi.Server();
server.connection({ host: process.env.IP, port: process.env.PORT });

const publicPath = Path.join(__dirname, "public");
const projectsPath = Path.join(publicPath, "projects");

const staticHandler = function(req, res){
    const projectSlug = req.params.project;
    const file = req.params.param;
   
    var projectPath;
    
    if(projectSlug){
        Utils.getProject(projectSlug, function(err, project){
            //TODO: verificar se o projecto tem codigo local
            if(err) console.log(err);
            else{
                //TODO: substituir por um exists
                if(project != {}) projectPath = Path.join(projectsPath, projectSlug, "static");
                else console.log("Project doesn't exist");
            }
        });
    } else { 
        projectPath = Path.join(publicPath, "index", "static"); 
    }
    
    if(projectPath){
        const filePath = Path.join(projectPath, file);
        res.file(filePath);
    } else {
        res.redirect("/");
    }
};

const indexHandler = function(req, res){
    const projectSlug = req.params.project;
    
    var indexPath;
    
    if(projectSlug){
        Utils.getProject(projectSlug, function(err, project){
            //TODO: verificar se o projecto tem codigo local
            if(err) console.log(err);
            else{
                //TODO: substituir por um exists
                if(project != {}) indexPath = Path.join(projectsPath, project, "index.html");
                else console.log("Project doesn't exist");
            }
        });
    } else { 
        indexPath = Path.join(publicPath, "index", "index.html");
    }
    
    if(indexPath){ res.file(indexPath); } 
    else { res.redirect("/"); }
};

const pluginConf = [ { register: require('hapi-mongoose-db-connector'), options: { mongodbUrl: "0.0.0.0:27017/my-website" } },
                     { register: require('inert') }];

var routes = [ { method: "GET", path: "/static/{param*}", handler: staticHandler },
               { method: "GET", path: "/{project}/{param*}", handler: staticHandler },
               { method: "GET", path: "/{project?}", handler: indexHandler } ];
               
const authRoutes = require(Path.join(__dirname, 'api', 'auth', 'routes', 'users'));
const projectRoutes = require(Path.join(__dirname, 'api', 'projects', 'routes', 'projects'));
const filesRoutes = require(Path.join(__dirname, 'api', 'files', 'routes', 'files'));
const musicRoutes = require(Path.join(__dirname, 'api', 'music', 'routes'));

routes.push.apply(routes, authRoutes);
routes.push.apply(routes, projectRoutes);
routes.push.apply(routes, filesRoutes);
routes.push.apply(routes, musicRoutes);

server.register(pluginConf, (err) => {
    if(err) throw err;
    
    server.register(require('hapi-auth-jwt2'), (err) => {
        if(err) throw err;
        
        server.auth.strategy('jwt', 'jwt', {
            key: secret,
            validateFunc: require('./api/auth/utils/validate'), 
            verifyOptions: { algorithms: ['HS256'] }
        });
        
        server.route(routes);

        server.start((err) => {
            if (err) { throw err; }
            console.log('Server running at:', server.info.uri);
        });
    });
});



