'use strict';

const Boom = require('boom');
const User = require('../models/user');
const bcrypt = require('bcrypt');

function verifyUniqueUser(req, res) {
    User.findOne({
        $or: [
            { email: req.payload.email },
            { username: req.payload.username }
        ]
    }, (err, user) => {
        if(err) throw err;
        if (user) {
            if (user.username === req.payload.username) {
                res(Boom.badRequest('Username taken'));
                return;
            }
            if (user.email === req.payload.email) {
                res(Boom.badRequest('Email taken'));
                return;
            }
        }
        res(req.payload);
    });
}

function verifyCredentials(req, res) {

    const password = req.payload.password;
    User.findOne({
        $or: [
            { email: req.payload.email },
            { username: req.payload.username }
        ]
    }, (err, user) => {
        if(err) throw err;
        if (user) {
            bcrypt.compare(password, user.password, (err, isValid) => {
                if(err) throw err;
                if (isValid) { res(user); }
                else { res(Boom.badRequest('Incorrect password!')); }
            });
        } else { res(Boom.badRequest('Incorrect username or email!')); }
    });
}

module.exports = {
    verifyUniqueUser: verifyUniqueUser,
    verifyCredentials: verifyCredentials
};
