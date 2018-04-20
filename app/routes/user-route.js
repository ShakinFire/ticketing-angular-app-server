const jwt = require('jsonwebtoken');
const verify = require('../config/verify-token').verify;
const Ucontroller = require('../controllers/user-controller');

const init = (app, data) => {
    const UserController = new Ucontroller(data);
    app.get('/api/users', (req, res) => {
        // auth validations

        // call controllers

        // send data
        res.json({
            name: 'Gosho',
            age: 23,
        });
    });

    app.post('/api/login', async (req, res) => {
        let password = '';
        let email = '';

        if (req.body.password && req.body.email) {
            password = req.body.password;
            email = req.body.email;
        }

        const user = await UserController.checkUser(email);

        if (!user) {
            res.json({
                message: 'No such user found',
            });
        }
        console.log(user.password);
        if (user.password !== password) {
            res.json({
                message: 'password incorect',
            });
        }

        // create token
        jwt.sign({ id: user.id }, 'unicorn', (err, token) => {
            res.json({
                token: token,
            });
        });
    });

    app.post('/api/tickets', verify, (req, res) => {
        jwt.verify(req.token, 'unicorn', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                res.json({
                    message: 'heeey',
                    data: authData,
                });
            }
        });
    });
};

module.exports = {
    init,
};
