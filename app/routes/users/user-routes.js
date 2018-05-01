const Ucontroller = require('./user-controller');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {
    Router
} = require('express');

const init = (app, data) => {
    const UserController = new Ucontroller(data);
    const router = new Router();

    app.use('/api', router);

    router
        .post('/login', async (req, res) => {
            let password = '';
            let email = '';

            if (req.body.password && req.body.email) {
                password = req.body.password;
                email = req.body.email;
            }

            const user = await UserController.checkUser(email);

            if (!user) {
                res.json({
                    message: 'Email is incorrect.',
                });
            }
            if (user.password !== password) {
                res.json({
                    message: 'Password is incorrect.',
                });
            }

            // create token
            /* eslint-disable */
            jwt.sign({
                id: user.id,
                firstName: user.firstName,
            }, process.env.SECRET_KEY, {
                expiresIn: process.env.EXPIRATION
            }, (err, token) => {
                res.json({
                    token: token,
                    expiresIn: process.env.EXPIRATION,
                });
            });
            /* eslint-enable */
        })
        .post('/register', async (req, res) => {
            const userReg = req.body;
            let newUser = null;

            newUser = await UserController.regValidation(userReg);

            // if user is equal to error message
            if (typeof newUser === 'string') {
                res.json({
                    message: newUser,
                });
            }

            /* eslint-disable */
            jwt.sign({
                id: newUser.id,
                firstName: newUser.firstName,
            }, process.env.SECRET_KEY, {
                expiresIn: process.env.EXPIRATION
            }, (err, token) => {
                res.json({
                    token: token,
                    expiresIn: process.env.EXPIRATION,
                });
            });
            /* eslint-enable */
        })
        .post('/test', passport.authenticate('jwt', {
            session: false
        }), (req, res) => {
            // testing authentication (guarded route)
            console.log('I AM AUTHENTICATED');
            res.json({
                user: req.user,
            });
        })
        .get('/allUsers', async (req, res) => {
            const result = await UserController.getAllUsersIdName();
            const users = result.map(x => ({
                id: x.id,
                name: x.firstName + ' ' + x.lastName
            }));

            res.json({
                users
            });
        });


};

module.exports = {
    init,
};