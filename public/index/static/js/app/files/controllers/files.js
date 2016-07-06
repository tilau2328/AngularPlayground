'use strict';
/* global angular */
/* global File */
var app = app || angular.module('playgroundApp');

function FilesCtrl($scope, $http, $window, FileSaver, FileService) {
    $scope.files = [];
    $scope.filesToUpload = [];
    $scope.currentPath = "/";
    $scope.clipboard = { file: null, mode: null };

    // Utils

    function getBack(file){
        var path = file.split("/");
        path.pop();
        return path.join("/") || "/";
    }

    function addFile(file){
        if(($scope.currentPath == file.path)
        || ($scope.currentPath == "/"
        &&  file.path == "")){
            $scope.files.push(file);
        }
    }

    function removeFile(file){
        if(($scope.currentPath == file.path)
        || ($scope.currentPath == "/"
        &&  file.path == "")){
            for(var i=0; i< $scope.files.length; i++){
                if($scope.files[i].name == file.name){
                    $scope.files.splice(i, 1);
                    break;
                }
            }
        }
    }

    // Anchored Methods

    $scope.list = function(path, name){
        var full_path;
        if(path == "/") { full_path = name; }
        else {
            if(name){ full_path = path + "/" + name; }
            else { full_path = path; }
        }
        
        FileService.list(full_path, function(err, files){
            if(err) console.log(err);
            else {
                $scope.currentPath = full_path || "/";
                $scope.files = files;
            }
        });
    };

    $scope.get = function(file){
        if(file){
            var file_name = prompt("Save file as: ", file.name);
            if(file_name){
                FileService.get(file, function(err, new_file, type){
                    if(err) console.log(err);
                    else {
                        var data = new File([ new_file ], file_name, { "type": type } );
                        FileSaver.saveAs(data, file_name, true);
                    }
                });
            }
        }
    };

    $scope.upload = function(){
        var files = $scope.filesToUpload;
        var path = $scope.currentPath;
        if(path == "/") { path = ""; }
        for(var i = 0; i < files.length ; i++){
            var file = files[i];
            FileService.upload(path, file, false, function(err, code, new_file){
                if(err) console.log(err);
                else {
                    switch(code){
                        case 200:
                            addFile(new_file);
                            break;
                        case 409:
                            if(confirm("File " + file.name + " already exists, do you want to overwrite it?")){
                                FileService.upload(path, file, true, function(err, code, new_file){
                                    if(err) console.log(err);
                                    else {
                                        switch(code){
                                            case 200:
                                                removeFile(new_file);
                                                addFile(new_file);
                                                break;
                                            default: 
                                                break;
                                        }
                                    }
                                });
                            }
                            break;
                        default: 
                            break;
                    }
                }
            });
        }
        $scope.filesToUpload = [];
    };

    $scope.delete = function(file){
        FileService.remove(file.path, file.name, function(err, code){
            if(err) console.log(err);
            else if(code == 200){
                if( $scope.clipboard.file != null
                && (file.path == $scope.clipboard.file.path
                && file.name == $scope.clipboard.file.name)){
                    $scope.clipboard.file = null;
                    $scope.clipboard.mode = null;
                }
                removeFile(file);
            }
        });
    };

    $scope.rename = function(file){
        var new_name = prompt((file.isDirectory ? "Directory's" : "File's") + " new name: ", file.name);
        if(new_name){
            FileService.rename(file.path, file.name, new_name, function(err, code){
                if(err) console.log(err);
                else if(code == 200){ file.name = new_name; }
            });
        }
    };

    $scope.copy = function(file){
        $scope.clipboard.file = file;
        $scope.clipboard.mode = "copy";
    };

    $scope.cut = function(file){
        $scope.clipboard.file = file;
        $scope.clipboard.mode = "cut";
    };

    $scope.paste = function(){
        var file = $scope.clipboard.file;
        if(file){
            var path = $scope.currentPath;
            switch($scope.clipboard.mode){
                case "copy":
                    FileService.copy(file.name, file.path, path, false, function(err, code, new_file){
                        if(err) console.log(err);
                        else {
                            switch(code){
                                case 200:
                                    addFile(new_file);
                                    break;
                                case 404:
                                    alert("It seems that file " + file.name + " is not there anymore");
                                    $scope.clipboard.file = null;
                                    $scope.clipboard.mode = null;
                                    break;
                                case 409:
                                    if(confirm("File " + file.name + " already exists at the destination directory, do you want to overwrite it?")){
                                        FileService.copy(file.name, file.path, path, true, function(err, code, new_file){
                                            if(err) console.log(err);
                                            else {
                                                switch(code){
                                                    case 200:
                                                        removeFile(file);
                                                        addFile(new_file);
                                                        break;
                                                    case 404:
                                                        alert("It seems that file " + file.name + " is not there anymore");
                                                        $scope.clipboard.file = null;
                                                        $scope.clipboard.mode = null;
                                                        break;
                                                }
                                            }
                                        });
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    });
                    break;
                case "cut":
                    FileService.move(file.name, file.path, path, false, function(err, code, new_file){
                        if(err) console.log(err);
                        else {
                            switch(code){
                                case 200:
                                    removeFile(file);
                                    addFile(new_file);
                                    $scope.clipboard.file = new_file;
                                    $scope.clipboard.mode = "copy";
                                    break;
                                case 404:
                                    alert("It seems that file " + file.name + " is not there anymore");
                                    $scope.clipboard.file = null;
                                    $scope.clipboard.mode = null;
                                    break;
                                case 409:
                                    if(confirm("File " + file.name + " already exists at the destination directory, do you want to overwrite it?")){
                                        FileService.move(file.name, file.path, path, true, function(err, code, new_file){
                                            if(err) console.log(err);
                                            else {
                                                switch(code){
                                                    case 200:
                                                        removeFile(file);
                                                        removeFile(new_file);
                                                        addFile(new_file);
                                                        $scope.clipboard.file = new_file;
                                                        $scope.clipboard.mode = "copy";
                                                        break;
                                                    case 404:
                                                        alert("It seems that file " + file.name + " is not there anymore");
                                                        $scope.clipboard.file = null;
                                                        $scope.clipboard.mode = null;
                                                        break;
                                                }
                                            }
                                        });
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    });
                    break;
                default:
                    break;
            }
        }
    };

    $scope.back = function(){
        $scope.currentPath = getBack($scope.currentPath);
        $scope.list($scope.currentPath);
    };

    $scope.newDir = function(){
        var path = $scope.currentPath;
        if(path == "/") { path = ""; }
        var dir_name = prompt("New directory's name: ");
        if(dir_name){
            FileService.newDir(path, dir_name, function(err, code, dir){
                if(err) console.log(err);
                else if(code == 200){ addFile(dir); }
            });
        }
    };

    $scope.list("/");
}

app.controller('FilesCtrl', ['$scope', '$http', '$window', 'FileSaver', 'FileService', FilesCtrl]);
