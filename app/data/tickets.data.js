const Data = require('./generic.data');

const {
    users,
} = require('../../db/models');

class TicketsData extends Data {
    constructor(ticketModel) {
        super(ticketModel);
    }

    getAllTicketsByTeam(name) {
        return this.Model.findAll({
                where: {
                    team: name,
                },
        });
    }

    getByRequester(userId) {
        return this.Model.findAll({
            attributes: { exclude: ['updatedAt', 'description', 'attach', 'estimated'] },
            where: {
                userId: userId,
            },
            include: [
                {
                    model: users,
                    as: 'users',
                    attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'email'] },
                    where: {
                        id: userId,
                    },
                },
            ],
        });
    }

    getAllTickestByUserAssignee(id) {
        return this.Model.findAll({
            attributes: { exclude: ['updatedAt', 'description', 'attach', 'estimated'] },
            where: {
                assigneeId: id,
            },
            include: [
                {
                    attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'email'] },
                    as: 'users',
                    model: users,
                },
            ],
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