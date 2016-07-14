const Path = require('path');
const Utils = require(Path.join(__dirname, '..', 'utils', 'utils'));
const Projects = require(Path.join(__dirname, '..', 'utils', 'projects'));
const Validators = require(Path.join(__dirname, '..', 'validators', 'projects'));

const slugifyProjectName = function(req, res){
    var project = req.payload;
    project.slug = Utils.slugify(project.title);
    res(project);
};

const getProjectsHandler = function(req, res){
    Projects.getProjects(function(err, projects){
        if(err) throw err;
        var toSend = [];
        for(var i = 0; i < projects.length; i++){
            var project = projects[i];
            toSend.push({ title: project.title, slug: project.slug, description: project.description, img: project.img });
        }
        res({ code: 200, projects: toSend });
    });
};  

const getProjectHandler = function(req, res){
    var projectSlug = req.params.slug;
    if(projectSlug){ //Não deve ser preciso
        Projects.getProject(projectSlug, function(err, project){
            if(err){
                console.log(err);
                res({ code: 404 });
            } else {
                if(project){
                    res({ code: 200, project: { title: project.title, slug: project.title, description: project.description } });
                } else {
                    res({ code: 404 });
                }
            }
        });
    }
};  

const createProjectHandler = function(req, res){
    var newProject = req.payload;
    Projects.createProject(newProject, function(err, project){
        if(err){
            console.log(err);
            res({ code: 409 });
        } else {
            res({ code: 200, project: { title: project.title, slug: project.title, description: project.description } });
        }
    });
};

const updateProjectHandler = function(req, res){
    var projectSlug = req.params.slug;
    
    var newProject = {};
    
    if(projectSlug){
        Projects.updateProject(projectSlug, newProject, function(err, project){
            if(err){
                console.log(err);
                res({ code: 404 });
            } else {
                res({ code: 200, project: { title: project.title, slug: project.title, description: project.description } });
            }
        });
    }
};

const deleteProjectHandler = function(req, res){
    var projectSlug = req.params.slug;
    if(projectSlug){
        Projects.deleteProject(projectSlug, function(err, project){
            if(err){
                console.log(err);
                res({ code: 404 });
            } else {
                res({ code: 200 });
            }
        });
    }
};

const getProjects = { 
    method: "GET", 
    path: "/api/projects",
    handler: getProjectsHandler 
};

const createProjects = { 
    method: "POST", 
    path: "/api/projects", 
    config: { 
        pre: [ { method: slugifyProjectName } ], 
        handler: createProjectHandler,  
        validate: { payload: Validators.createProject },
        auth: {
            strategy: 'jwt'
        }  
    } 
};

const getProject = { 
    method: "GET", 
    path: "/api/projects/{slug}", 
    config: { 
        handler: getProjectHandler, 
        validate: { params: Validators.params } 
    } 
};

const updateProject = { 
    method: "PUT", 
    path: "/api/projects/{slug}", 
    config: { 
        pre: [ { method: slugifyProjectName } ], 
        handler: updateProjectHandler,  
        validate: { 
            payload: Validators.updateProject, 
            params: Validators.params 
        },
        auth: {
            strategy: 'jwt'
        } 
    } 
};

const deleteProject = {
    method: "DELETE",
    path: "/api/projects/{slug}",
    config: { 
        handler: deleteProjectHandler,
        validate: { params: Validators.params },
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        } 
    }
};

module.exports = [ getProjects, createProjects, getProject, updateProject, deleteProject ];