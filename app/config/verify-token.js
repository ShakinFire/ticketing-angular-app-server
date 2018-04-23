
/* ================================================= */
// Way of decode token with jwt.verify()
// NOT USED RIGHT NOW, THIS IS JUST A SAMPLE
/* ================================================= */

const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
    } else {
        req.token = '';
    }

    next();
};

const constrains = (req, res, next) => {
    if (req.token) {
        /* eslint-disable */
        jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        /* eslint-enable */
            if (err) {
                res.sendStatus(403);
            } else {
                req.userId = authData.id || '';
            }
        });
    }

    next();
};

module.exports = {
    verify,
    constrains,
};
