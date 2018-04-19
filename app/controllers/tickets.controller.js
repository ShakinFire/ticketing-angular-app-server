const ta = require('../../../node_modules/time-ago/timeago');
class TicketsControler {
    constructor(data) {
        this.data=data;
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

    async getAllTeamByUser(id) {
        
    }
}