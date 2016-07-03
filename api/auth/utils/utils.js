const bcrypt = require('bcrypt');

function hashPassword(password, cb) {
    bcrypt.genSalt(10, (err, salt) => {
        if(err) return cb(err, null);
        bcrypt.hash(password, salt, (err, hash) => {
           return cb(err, hash);
        });
    });
}

module.exports = {
    hashPassword: hashPassword
};