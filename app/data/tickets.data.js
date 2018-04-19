const Data = require('./generic.data');

class TicketsData extends Data {
    constructor(Model) {
        super(Model);
    }

    getAllTicketsByTeam(name) {
        return this.Model.findAll({
                where: {
                    team: name,
                },
        });
    }
    getAllTickestByUserRequerter(name) {
        return this.Model.findAll({
            where: {
                requerter: name,
            },
        });
    }
    getAllTickestByUserAssignee(name) {
        return this.Model.findAll({
            where: {
                assignee: name,
            },
        });
    }
    getByTitle(value) {
        return this.Model.findOne({
            where: {
                title: value,
            },
        });
    }
    getByLabel(value) {
        return this.Model.findOne({
            where: {
                labels: value,
            },
        });
    }
    getByAssignee(value) {
        return this.Model.findOne({
            where: {
                assignee: value,
            },
        });
    }
}

module.exports = TicketsData;