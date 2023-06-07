const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'jjrz';
exports.createToken = function(user) {
    const payload = {
        sub: user.id,
        ip:user.ip,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    }
    return jwt.encode(payload, secret);

    
}