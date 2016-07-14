require('mongoose');
const User = require('../models/user');

function validate(decoded, request, callback){
    User.findOne({ username: decoded.username }, 
    function(err, user){
        if(err) return callback(err);
        if(user) return callback(null, true);
        return callback(null, false);
    });
}

module.exports = validate;