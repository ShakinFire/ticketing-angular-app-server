const {
    Router
} = require('express');
const Ncontroller = require('./notification-controler');
const passport = require('passport');
const UserControler = require('../users/user-controller');

const init = (app, data) => {
    const controller = new Ncontroller(data);
    const router = new Router();
    const uController = new UserControler(data);

    app.use('/api', router);

    router
        .get('/notificationUser/:id', async (req, res) => {
            const id = req.params.id;
            const result = await controller.getNotification(id);
            res.json({
                result,
            });
        })
        .put('/updateNotification', async (req, res) => {
            const result = await controller.updateTypeNotification(req.body.id);
            res.json({
                result,
            });
        })
        .post('/create-notification', async (req, res) => {
            const notification = req.body;
            const user = notification.userId;
            if (isNaN(user)) {
                const userId = await uController.getUserId(user);
                const obj = {
                    content: notification.content,
                    userId: userId,
                    type: notification.type,
                    nameType: notification.nameType,
                };
                const result = await controller.createNotification(obj);
                res.json({
                    result,
                });
            } else {
                const obj = {
                    content: notification.content,
                    userId: user,
                    type: notification.type,
                    nameType: notification.nameType,
                };
                const result = await controller.createNotification(obj);
                res.json({
                    result,
                });
            }
        });
};


module.exports = {
    init,
};