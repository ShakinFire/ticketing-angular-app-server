const {
    Router,
} = require('express');
const Tcontroller = require('./tickets-controller');
const passport = require('passport');

const init = (app, data) => {
    const TicketController = new Tcontroller(data);
    const router = new Router();

    app.use('/api', router);

    router

        .get('/getAllAssignedTickets', passport.authenticate('jwt', {
            session: false
        }), async (req, res) => {
            const allAssignedTickets = await TicketController.getAllAssignedTickets(req.user.id);

            res.json({
                tickets: allAssignedTickets,
            });
        })
        .get('/getAllMyTickets', passport.authenticate('jwt', {
            session: false
        }), async (req, res) => {
            const allMyTickets = await TicketController.getAllMyTickets(req.user.id);
            console.log(allMyTickets);
            res.json({
                tickets: allMyTickets,
            });
        })
        .get('/ticket-view/:id', passport.authenticate('jwt', {
            session: false
        }), async (req, res) => {
            const ticket = await TicketController.getSingleTicket(req.params.id);
            res.json({
                ticket: ticket.ticket,
                assignee: ticket.assignee,
                requester: ticket.requester,
            });
        })
        .post('/create-ticket', async (req, res) => {
            const obj = req.body;
            console.log(obj);
            const result = await TicketController.createNewTicket(obj);

            res.json({
                result,
            });
        })
        .get('/ticketByName/:name', async (req, res) => {
            console.log('req.params');
            const ticket = await TicketController.getTicketByName(req.params.name);
            res.json({
                ticket,
            });
        });

    // .get('/getAllTicketsDataLessTwo', async (req, res) => {
    //     const result = await TicketController.getAllTicketDateIsTwo();
    //     res.json({
    //         result,
    //     });
    // })
};

module.exports = {
    init,
};