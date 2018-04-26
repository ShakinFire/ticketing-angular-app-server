const { Router } = require('express');
const Tcontroller = require('./tickets-controller');
const passport = require('passport');

const init = (app, data) => {
    const TicketController = new Tcontroller(data);
    const router = new Router();

    app.use('/api', router);

    router
        .get('/getAllAssignedTickets', passport.authenticate('jwt', { session: false }), async (req, res) => {
            const allAssignedTickets = await TicketController.getAllAssignedTickets(req.user.id);

            res.json({
                tickets: allAssignedTickets,
            });
        });
};

module.exports = {
    init,
};
