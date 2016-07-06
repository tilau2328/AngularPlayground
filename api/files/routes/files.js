/*
    Ficheiro de routes e handlers dos ficheiros dinamicos.
*/

const Path = require("path");
const Fs = require("fs");
const Mime = require("mime");
const Boom = require("boom");

const utils = require(Path.join(__dirname, "..", "utils", "files"));

const files_config = require(Path.join(__dirname, "..", "config.js"));

utils.init_dirs(files_config.base_dirs, Path.join(__dirname, "..", "..", ".."));

const files_dir = Path.join(__dirname, "..", "..", "..", files_config.base_dirs.name);

// Utils

//Verifica se o caminho tem ".." para evitar porcaria

// Handlers

const files_handler = function(req, res) {
    var absolute_path = files_dir;
    var path = req.query.path || "";

    if(utils.checkForCheating(path))
        absolute_path = Path.join(files_dir, path);

    if (Fs.existsSync(absolute_path)) {
        if (Fs.lstatSync(absolute_path).isDirectory()) {
            Fs.readdir(absolute_path, function (err, files) {
                if (err) throw err;

                var data = [];
                files.forEach(function(file){
                    if (Fs.lstatSync(Path.join(absolute_path,file)).isDirectory()) {
                        data.push({ name: file, isDirectory: true, path: path });
                    } else {
                        var ext = Path.extname(file);
                        data.push({ name: file, ext: ext, isDirectory: false, path: path });
                    }
                });
                res({ code: 200, files: data });
            });
        } else {
            var file = Path.basename(path);
            var ext = Path.extname(path);
            res({ name: file, ext: ext, isDirectory: false, path: Path.dirname(path) });
        }
    } else {
        res({ code: 404 });
    }
};

const upload_files_handler = function(req, res) {
    var absolute_path = files_dir;
    var data = req.payload;
    var path = data.path;
    var overwrite = data.overwrite;
    var file = data.file;
    if(file){
        if(Fs.existsSync(Path.join(absolute_path, path))){
            var file_name = file.hapi.filename;
            var file_path = Path.join(path, file_name);
            if(utils.checkForCheating(file_path)){
                absolute_path = Path.join(absolute_path, file_path);
                if(Fs.existsSync(absolute_path) && overwrite == "false"){
                    res({ code: 409, name: file_name });
                } else {
                    var pipe = Fs.createWriteStream(absolute_path);
                    pipe.on('error', (err) => {
                        if(err) throw err;
                    });
                    file.pipe(pipe);
                    file.on('end', function (err) {
                        if(err) throw err;
                        var ext = Path.extname(file_name);
                        var response = { name: file_name, ext: ext, isDirectory: false, path: path };
                        res({ code: 200, file: response });
                    });
                }
            }
        } else {
            res({ code: 404, file: file_name });
        }
    }
};

const rename_files_handler = function(req, res) {
    var absolute_path = files_dir;
    var data = req.payload;
    var file_name = data.file;
    var new_name = data.name;
    var old_path = Path.join(data.path, file_name);
    var new_path = Path.join(data.path, new_name);
    if(utils.checkForCheating(old_path) && utils.checkForCheating(new_path)){
        old_path = Path.join(absolute_path, old_path);
        new_path = Path.join(absolute_path, new_path);
        if(!Fs.existsSync(old_path)){ res({ code: 404 }); }
        else if(Fs.existsSync(new_path)){ res({ code: 409 }); }
        else {
            Fs.renameSync(old_path, new_path);
            res({ code: 200 });
        }
    }
};

const delete_files_handler = function(req, res) {
    var path = req.query.path || "";
    var file = req.query.file;
    var file_path = Path.join(path, file);
    if(utils.checkForCheating(file_path)){
        var absolute_path = Path.join(files_dir, file_path);
        if (Fs.existsSync(absolute_path)) {
            if(Fs.lstatSync(absolute_path).isDirectory()){ utils.rmdir(absolute_path); }
            else { Fs.unlinkSync(absolute_path); }
            res({ code: 200, name: file });
        } else { res({ code: 404, name: file }); }
    }
};

const get_file_handler = function(req, res) {
    const file = req.pre.file;
    if(file.code == 200)
        res.file(Path.join(files_dir, file.path, file.name)).header('Content-Type', Mime.lookup(file.name));
    else
        res(file);
};

const pre_get_file_handler = function(req, res){
    var path = req.query.path || "";
    var file = req.query.file || "";
    var file_path = Path.join(path, file);
    if(utils.checkForCheating(file_path)){
        var absolute_path = Path.join(files_dir, file_path);
        if (Fs.existsSync(absolute_path)) {
            if(!Fs.lstatSync(absolute_path).isDirectory()){
                res({ path: path, name: file, type: Mime.lookup(file), code: 200 });
                return;
            } else { throw Boom.notFound('Invalid File!'); }
        } else { throw Boom.notFound('File not found!'); }
    } else { throw Boom.notFound('Invalid File!'); }
};

const copy_file_handler = function(req, res) {
    var absolute_path = files_dir;
    var data = req.payload;
    var file_name = data.file;
    var old_path = Path.join(data.from, file_name);
    var new_path = Path.join(data.to, file_name);
    if(utils.checkForCheating(old_path) && utils.checkForCheating(new_path)){
        old_path = Path.join(absolute_path, old_path);
        new_path = Path.join(absolute_path, new_path);
        if(!Fs.existsSync(old_path)){
            res({ code: 404 });
        } else if(Fs.existsSync(new_path)){
            res({ code: 409 });
        } else {
            var file = { name: file_name, path: data.to };
            if(Fs.lstatSync(old_path).isDirectory()){
                utils.copyDir(old_path, new_path);
                file.isDirectory = true;
            } else {
                utils.copy(old_path, new_path);
                file.isDirectory = false;
                file.ext = Path.extname(file_name);
            }
            res({ code: 200, file: file });
        }
    }
};

const move_file_handler = function(req, res) {
    var absolute_path = files_dir;
    var data = req.payload;
    var file_name = data.file;
    var old_path = Path.join(data.from, file_name);
    var new_path = Path.join(data.to, file_name);
    if(utils.checkForCheating(old_path) && utils.checkForCheating(new_path)){
        old_path = Path.join(absolute_path, old_path);
        new_path = Path.join(absolute_path, new_path);

        if(!Fs.existsSync(old_path)){
            res({ code: 404 });
        } else if(Fs.existsSync(new_path)){
            res({ code: 409 });
        } else {
            var file = { name: file_name, path: data.to, isDirectory: Fs.lstatSync(old_path).isDirectory() };
            if(!file.isDirectory) { file.ext = Path.extname(file_name); }
            Fs.renameSync(old_path, new_path);
            res({ code: 200, file: file });
        }
    }
};

const new_dir_handler = function(req, res) {
    var absolute_path = files_dir;
    var data = req.payload;
    var path = data.path || "";
    var name = data.name;
    var dir_path = Path.join(path, name);
    if(utils.checkForCheating(dir_path)){
        absolute_path = Path.join(absolute_path, dir_path);
        if(Fs.existsSync(absolute_path)){ res({ code: 409 }); }
        else {
            Fs.mkdirSync(absolute_path);
            res({ code: 200, file: { name: name, isDirectory: true, path: path } });
        }
    }
};

// TODO: Implementar verificação de token
const routes = [{ method: "GET",    path: "/files",          handler: files_handler        },
                { method: "POST",   path: "/files",          config: { handler: upload_files_handler,
                  payload: { output: 'stream', parse: true,  maxBytes: 209715200, 
                  timeout: 60000, allow: 'multipart/form-data' }}},
                { method: "PUT",    path: "/files",          handler: rename_files_handler },
                { method: "DELETE", path: "/files",          handler: delete_files_handler },
                { method: "GET",    path: "/files/get",      config: { pre: [ { method: pre_get_file_handler, assign: 'file' } ],
                  handler: get_file_handler } },
                { method: "POST",   path: "/files/copy",     handler: copy_file_handler    },
                { method: "POST",   path: "/files/move",     handler: move_file_handler     },
                { method: "POST",   path: "/files/newdir",   handler: new_dir_handler     }];

module.exports = routes;
