const Controller = require('../controllers/tickets.controller');
const {
    Router
} = require('express');


const init = (app, data) => {
    const TicketController = new Controller(data);
    const router = new Router();

    app.use('/api', router);

    router
        .post('/create-ticket', async (req, res) => {

            const obj = req.body;
            console.log(obj);
            const result = await TicketController.createNewTicket(obj);

            res.json({
                result,
            });
        });
};

module.exports = {
    init,
};