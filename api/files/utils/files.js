const Path = require("path");
const Fs = require("fs");

const init_dirs = function(dir, path) {
    var dir_path = Path.join(path, dir.name);
    if(!Fs.existsSync(dir_path)){ Fs.mkdirSync(dir_path); }
    for(var i = 0; i < dir.dirs.length; i++){ init_dirs(dir.dirs[i], dir_path); }
};

const checkForCheating = function(path){
    if(path!=null){
        var aux = path.split(Path.sep);
        return (aux.indexOf('..') == -1);
    }
};

const rmdir = function(dir_path){
    if( Fs.existsSync(dir_path) ) {
        Fs.readdirSync(dir_path).forEach(function(file){
            var file_path = Path.join(dir_path, file);
            if(Fs.lstatSync(file_path).isDirectory()) { rmdir(file_path); }
            else { Fs.unlinkSync(file_path); }
        });
        Fs.rmdirSync(dir_path);
    }
};

function copy(from_path, to_path) {
    var target_path = to_path;
    if (Fs.existsSync(to_path) ) {
        if (Fs.lstatSync(to_path).isDirectory()) {
            target_path = Path.join( to_path, Path.basename(from_path));
        }
    }
    Fs.writeFileSync(target_path, Fs.readFileSync(from_path));
}

function copyDir(from_path, to_path) {
    var files = [];
    var target_path = Path.join(to_path, Path.basename(from_path));
    if (!Fs.existsSync(target_path)) { Fs.mkdirSync(target_path); }

    if ( Fs.lstatSync(from_path).isDirectory() ) {
        files = Fs.readdirSync(from_path);
        files.forEach(function(file) {
            var current_path = Path.join(from_path, file);
            if ( Fs.lstatSync(current_path).isDirectory() ) { copyDir(current_path, target_path); }
            else { copy(current_path, target_path); }
        });
    }
}

module.exports = {
    init_dirs: init_dirs,
    checkForCheating: checkForCheating,
    rmdir: rmdir,
    copy: copy,
    copyDir: copyDir
};