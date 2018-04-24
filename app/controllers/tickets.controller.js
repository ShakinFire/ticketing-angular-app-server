// const ta = require('../../../node_modules/time-ago/timeago');
class TicketsControler {
    constructor(data) {
        this.data = data;
    }
    async getTicketUserRequester(id) {
        const user = this.data.users.findById(id);
        const name = user.name;
        const tickets = this.data.tickets.getAllTickestByUserRequerter(name);
        return tickets;
    }
    async getAllTickestUserAssignee(id) {
        const user = this.data.users.findById(id);
        const name = user.name;
        const tickets = this.data.tickets.getAllTickestByUserAssignee(name);
        return tickets;
    }

    _validateTicket(ticketInfo) {
        let message = null;

        if (ticketInfo.title.length < 2) {
            message = 'Title must be at least 2 characters.'
        }

        return message;
    }

    async createNewTicket(obj) {
        this._validateTicket(obj);
        const newTicket = await this.data.tickets.create(obj);
        return newTicket;
    }


}
module.exports = TicketsControler;