'use strict';
/* global angular */
var app = app || angular.module('playgroundApp');

app.factory('FileService', ['$http', FileService]);

function FileService($http) {
    
    const list = function(path, callback){
        $http.get( "/files", { params: { "path": path || "" } } )
             .then( function(res) { callback( null, res.data.files ); }, 
                    function errorCallback(err) { callback(err); } );
    };
    
    const get = function(file, callback){
        $http.get( "/files/get", { params: { "path": file.path, "file": file.name }, headers: { 'responseType': "blob" }, responseType: 'arraybuffer' })
             .then( function(res) { callback( null, res.data, res.headers("Content-type") ); }, 
                    function errorCallback(res) { console.log("error"); } );
    };
    
    const upload = function(path, file, ow, callback){
        var fd = new FormData();
        fd.append("path", path);
        fd.append("file", file);
        fd.append("overwrite", ow);
        $http.post( "/files", fd, { transformRequest: angular.identity, headers: { 'Content-Type': undefined } } )
             .then( function(res){ callback( null, res.data.code, res.data.file ); }, 
                    function errorCallback(err) { callback(err); });
    };
    
    const remove = function(path, file, callback){
        $http.delete( "/files", { params: { "path": path, "file": file } } )
             .then( function(res) { callback( null, res.data.code ); }, 
                    function errorCallback(err) { callback(err); });
    };
    
    const rename = function(path, file, new_name, callback){
        $http.put( "/files", { file: file, path: path, name: new_name})
             .then( function(res){ callback( null, res.data.code ); }, 
                    function errorCallback(err) { callback(err); });
    };
    
    const copy = function(file, from, to, ow, callback){
        $http.post( "/files/copy", { file: file, from: from, to: to, overwrite: ow })
             .then( function(res){ callback(null, res.data.code, res.data.file); }, 
                    function errorCallback(err) { callback(err); });
    };
    
    const move = function(file, from, to, ow, callback){
        $http.post( "/files/move", { file: file, from: from, to: to, overwrite: ow })
             .then( function(res){ callback(null, res.data.code, res.data.file); }, 
                    function errorCallback(err) { callback(err); });
    };
    
    const newDir = function(path, dir_name, callback){
        $http.post( "/files/newdir", { path: path, name: dir_name })
             .then( function(res){ callback(null, res.data.code, res.data.file); }, 
                    function errorCallback(err) { callback(err); });
    };
    
    return {
        list: list,
        get: get,
        upload: upload,
        remove: remove,
        rename: rename,
        copy: copy,
        move: move,
        newDir: newDir
    };
}
