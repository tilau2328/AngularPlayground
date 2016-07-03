// server.js

'use strict';

const Path = require("path");
const Hapi = require('hapi');
const Utils = require(Path.join(__dirname, 'api', 'projects', 'utils', 'projects'));
const secret = 'secret';

const server = new Hapi.Server();
server.connection({ host: process.env.IP, port: process.env.PORT });

const publicPath = Path.join(__dirname, "public");
const projectsPath = Path.join(publicPath, "projects");

const staticHandler = function(req, res){
    const project = req.params.project;
    const file = req.params.param;
   
    var projectPath;
    
    if(project){
        //TODO: verificar se o projecto tem codigo local
        if(Utils.getProject(project) != {}){
            projectPath = Path.join(projectsPath, project, "static"); 
        } else {
            console.log("Project Doesn't exist");
        }
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
    const project = req.params.project;
    
    var indexPath;
    
    if(project){
        //TODO: verificar se o projecto tem codigo local
        if(Utils.getProject(project) != {}){
            indexPath = Path.join(projectsPath, project, "index.html");
        } else {
            console.log("Project Doesn't exist");
        }
    } else { 
        indexPath = Path.join(publicPath, "index", "index.html");
    }
    
    if(indexPath){
        res.file(indexPath);
    } else {
        res.redirect("/");
    }
};

const pluginConf = [ { register: require('hapi-mongoose-db-connector'), options: { mongodbUrl: "0.0.0.0:27017/my-website" } },
                     { register: require('inert') }];

var routes = [ { method: "GET", path: "/static/{param*}", handler: staticHandler },
               { method: "GET", path: "/{project}/{param*}", handler: staticHandler },
               { method: "GET", path: "/{project?}", handler: indexHandler } ];
               
const projectRoutes = require(Path.join(__dirname, 'api', 'projects', 'routes', 'projects'));
const authRoutes = require(Path.join(__dirname, 'api', 'auth', 'routes', 'users'));

routes.push.apply(routes, projectRoutes);
routes.push.apply(routes, authRoutes);

server.register(pluginConf, (err) => {
    if(err) throw err;
    
    server.register(require('hapi-auth-jwt'), (err) => {
        if(err) throw err;
        
        server.auth.strategy('jwt', 'jwt', {
            key: secret,
            verifyOptions: { algorithms: ['HS256'] }
        });
        
        server.route(routes);

        server.start((err) => {
            if (err) { throw err; }
            console.log('Server running at:', server.info.uri);
        });
    });
});



