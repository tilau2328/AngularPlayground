'use strict';

const Boom = require('boom');
const User = require('../models/user');
const utils = require('../utils/utils');
const createToken = require('../utils/token');
const verifiers = require('../verifiers/users');
const userUtils = require('../utils/users');

const login = {
    method: 'POST',
    path: '/login',
    config: {
        auth: false,
        pre: [
            { method: userUtils.verifyCredentials, assign: 'user' }
        ],
        handler: (req, res) => {
            res({ token: createToken(req.pre.user) }).code(201);
        },
        validate: {
            payload: verifiers.login
        }
    }
};

const register = {
    method: 'POST',
    path: '/register',
    config: {
        pre: [
            { method: userUtils.verifyUniqueUser }
        ],
        handler: (req, res) => {
        
        let user = new User();
        user.email = req.payload.email;
        user.username = req.payload.username;
        user.admin = false;
        utils.hashPassword(req.payload.password, (err, hash) => {
            if (err) { throw Boom.badRequest(err); }
            user.password = hash;
            user.save((err, user) => {
                if (err) {
                    throw Boom.badRequest(err);
                }
                res({ token: createToken(user) }).code(201);
            });
        });
        
        },
        validate: { payload: verifiers.register }
    }
};


const update = {
    method: 'PATCH',
    path: '/users/{id}',
    config: {
        pre: [
            { method: userUtils.verifyUniqueUser, assign: 'user' }
        ],
        handler: (req, res) => {
            const id = req.params.id;
            User.findOneAndUpdate({ _id: id }, req.pre.user, (err, user) => {
                if (err) { throw Boom.badRequest(err); }
                if (!user) { throw Boom.notFound('User not found!'); }
                res( { message: 'User updated!' } );
            });
        },
        validate: {
            payload: verifiers.update,
            params: verifiers.params
        },
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        }
    }
};


module.exports = [ login, register, update ];