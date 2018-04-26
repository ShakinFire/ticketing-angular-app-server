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
        if (ticketInfo.labels.length < 2) {
            message = 'Error: Labels should be at least 2 characters'
        }
        if (ticketInfo.description.length < 1) {
            message = 'Error: Write a description'
        }
        if (ticketInfo.team.length < 1) {
            message = 'Error: You have not chosen a team'
        }
        if (ticketInfo.assignee.length < 1) {
            message = 'Error: You have not chosen a assignee'
        }
        if (ticketInfo.assignee.length < 1) {
            message = 'Error: You have not chosen a assignee'
        }
        if (ticketInfo.estimated.length < 10) {
            message = 'Error: you did not select the correct date'
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