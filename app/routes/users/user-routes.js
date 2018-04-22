const Ucontroller = require('./user-controller');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { Router } = require('express');

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
            jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRATION }, (err, token) => {
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

            try {
                newUser = await UserController.regValidation(userReg);
            } catch (error) {
                res.json({
                    errorMessage: error.message,
                });
            }

            res.json({
                user: newUser,
            });
        })
        .post('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
            // testing authentication (guarded route)
            res.json({
                user: req.user,
            });
        });
};

module.exports = {
    init,
};
