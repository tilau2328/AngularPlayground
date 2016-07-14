const Path = require('path');
require('mongoose');
const Projects = require(Path.join(__dirname, '..', 'models', 'project'));

function getProjects(callback){
    return Projects.find({}, function (err, projects) {
        if (err) return callback(err);
        if(projects){ return callback(null, projects); }
        return callback(null, []);
    });
}

function createProject(newProject, callback){
    var project = new Projects();
    project.title = newProject.title;
    project.slug = newProject.slug;
    project.description = newProject.description;
    project.save((err, res) => {
        if (err) { return callback(err); }
        return callback(null, res);
    });
}

function getProject(projectSlug, callback){
    return Projects
        .findOne({ slug: projectSlug })
        .exec(function (err, project) {
            if (err) return callback(err);
            if(project) return callback(null, project); 
            return callback(null, {});
        });
}

function updateProject(projectSlug, newProject, callback){
    return Projects
        .updateOne({ slug: projectSlug }, newProject)
        .exec(function (err, project) {
            if (err) return callback(err);
            if(project){ return callback(null, project); } 
            return callback(null, {});
        });
}

function deleteProject(projectSlug, callback){
    return Projects.removeOne({ slug: projectSlug }, function (err, project) {
            if (err) return callback(err);
            if(project){ return callback(null, project); } 
            return callback(null, {});
        });
}

module.exports = {
    getProjects: getProjects,
    createProject: createProject,
    getProject: getProject,
    updateProject: updateProject,
    deleteProject: deleteProject
};