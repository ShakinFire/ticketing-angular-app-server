const {
    Router
} = require('express');
const Ncontroller = require('./notification-controler')
const passport = require('passport');
const UserControler = require('../users/user-controller');

const init = (app, data) => {
    const controller = new Ncontroller(data);
    const router = new Router();
    const uController = new UserControler(data);

    app.use('/api', router);

    router
        .post('/create-notification', async (req, res) => {
            const notification = req.body;
            const userId = await uController.getUserId(notification.user);
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
        })
        .get('/notificationUser/:id', async (req, res) => {
            const id = req.params.id;
            const result = await controller.getNotification(id);
            console.log(result);
            res.json({
                result,
            });
        });
};

module.exports = {
    init,
};