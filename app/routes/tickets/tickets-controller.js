class TicketController {
    constructor(data) {
        this.data = data;
    }

    _getMonth(month) {
        let result = null;
        switch (month) {
            case '01':
                result = 'Jan';
                break;
            case '02':
                result = 'Feb';
                break;
            case '03':
                result = 'Mar';
                break;
            case '04':
                result = 'Apr';
                break;
            case '05':
                result = 'May';
                break;
            case '06':
                result = 'Jun';
                break;
            case '07':
                result = 'Jul';
                break;
            case '08':
                result = 'Aug';
                break;
            case '09':
                result = 'Sep';
                break;
            case '10':
                result = 'Oct';
                break;
            case '11':
                result = 'Nov';
                break;
            case '12':
                result = 'Dec';
                break;
            default:
                result = 'Invalid information';
        }

        return result;
    }

    _getDate(ticketInfo) {
        const currentDate = JSON.stringify(ticketInfo).split('T');
        const dmy = currentDate[0].split('-'); // day-month-year
        const year = dmy[0].substring(3, 5);
        const hms = currentDate[1].split(':'); // hour-minute-secound
        const result =
            `${this._getMonth(dmy[1])} ${dmy[2]}'${year} at ${hms[0]}:${hms[1]}`;

        return result;
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

    async getAllAssignedTickets(userId) {
        const tickets = await this.data.tickets.getAllTickestByUserAssignee(+userId);

        await Promise.all([tickets.forEach(async (ticket) => {
            ticket.dataValues.date = this._getDate(ticket.createdAt);
        })]);

        return tickets;
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

    async createNewTicket(obj) {
        this._validateTicket(obj);
        const newTicket = await this.data.tickets.create(obj);
        return newTicket;
    }
}

module.exports = TicketController;