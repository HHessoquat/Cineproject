const xss = require('xss');

function escapeData(req, res, next) {

    if (req.body.seatsDisplay) {
        for (let key in req.body) {
            req.body[key] = xss(req.body[key]);
        }
    }

    next();
}
module.exports = escapeData;