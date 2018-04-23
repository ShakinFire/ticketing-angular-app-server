const passportJWT = require('passport-jwt');
const passport = require('passport');

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const opts = {};

const init = (app, data) => {
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    /* eslint-disable */
    opts.secretOrKey = process.env.SECRET_KEY;
    /* eslint-enable */

    passport.use('jwt', new JwtStrategy(opts, async (jwtPayload, next) => {
        const user = await data.users.getById(jwtPayload.id);
        console.log(jwtPayload);
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    }));

    passport.use('jwt-admin', new JwtStrategy(opts, async (jwtPayload, next) => {
        const user = await data.users.getById(jwtPayload.id);

        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    }));

    app.use(passport.initialize());
};

module.exports = {
    init,
};

