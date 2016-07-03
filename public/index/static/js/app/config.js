'use strict';
/* global angular */

var app = app || angular.module('playgroundApp', ['ui.router']);

app.config([ '$stateProvider', '$urlRouterProvider', appConfig]);

function appConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
        url: '/',
        views: {
            'navbar': {
                templateUrl : '/static/js/app/main/views/navbar.html',
                controller  : 'NavCtrl'
            },
            'content': {
                templateUrl : '/static/js/app/main/views/home.html'
            },
            'footer': {
                templateUrl : '/static/js/app/main/views/footer.html'
            }
        }
    }).state('app.aboutme', {
        url: 'aboutme',
        data: {
            name: "About Me"
        },
        views: {
            'content@': {
                templateUrl : '/static/js/app/main/views/aboutme.html'
            }
        }
    }).state('app.contacts', {
        url: 'contacts',
        data: {
            name: "Contacts"
        },
        views: {
            'content@': {
                templateUrl : '/static/js/app/main/views/contacts.html'
            }
        }
    }).state('app.register', {
        url: 'register',
        views:{
            'content@': {
                templateUrl : '/static/js/app/auth/views/register.html',
                controller  : 'AuthCtrl'
            }
        }
    }).state('app.projects', {
        url: 'projects',
        views:{
            'content@': {
                templateUrl : '/static/js/app/projects/views/list.html',
                controller  : 'ProjectsCtrl'
            }
        }
    }).state('app.projects.detail', {
        url: '/detail/:slug',
        views:{
            'content@': {
                templateUrl : '/static/js/app/projects/views/detail.html',
                controller  : 'ProjectsCtrl'
            }
        }
    }).state('app.projects.add', {
        url: '/add',
        views:{
            'content@': {
                templateUrl : '/static/js/app/projects/views/add.html',
                controller  : 'ProjectsCtrl'
            }
        }
    });

    $urlRouterProvider.otherwise('/');
}
