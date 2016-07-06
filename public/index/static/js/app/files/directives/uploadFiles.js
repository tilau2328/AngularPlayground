'use strict';
/* global angular */

var app = app || angular.module('app');

const uploadFiles = function(){
    return {
        restrict: 'A',
        // templateUrl: "/static/js/app/files/directives/templates/upload.html",
        // replace: true,
        scope: { files: "=uploadFiles" },
        link: function($scope, $el, $attrs){
            $el.on('change', function(event){
                $scope.files = event.target.files;
                $scope.$apply();
            });
        }
    };
};

app.directive("uploadFiles", uploadFiles);
