const Data = require('./generic.data');
const sequelize = require('sequelize');
const Op = sequelize.Op;

// const timezone = 'Europe/Vilnius'

// require('moment').tz.setDefault(timezone)

const {
    users,
    comments,
    teams,
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
            attributes: {
                exclude: ['updatedAt', 'description', 'attach', 'estimated']
            },
            where: {
                userId: userId,
            },
            include: [{
                model: users,
                as: 'users',
                attributes: {
                    exclude: ['password', 'updatedAt', 'createdAt', 'email']
                },
                where: {
                    id: userId,
                },
            }, ],
        });
    }

    getAllTickestByUserAssignee(id) {
        return this.Model.findAll({
            attributes: {
                exclude: ['updatedAt', 'description', 'attach', 'estimated']
            },
            where: {
                assigneeId: id,
            },
            include: [{
                attributes: {
                    exclude: ['password', 'updatedAt', 'createdAt', 'email']
                },
                as: 'users',
                model: users,
            }, ],
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
    getTicketsByDate() {
        return this.Model.findAll({
            where: {
                estimated: {
                    [Op.lte]: (new Date() + 48 * 60 * 60 * 1000)
                }
            }
        })
    }

    getTicketAndComments(id) {
        return this.Model.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: comments,
                    as: 'comments',
                    attributes: { exclude: ['userId', 'ticketId', 'updatedAt'] },
                    include: [
                        {
                            model: users,
                            as: 'users',
                            attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'email'] },
                        },
                    ],
                },
                {
                    model: teams,
                },
            ],
        });
    }

    updateTotalComments(ticketId) {
        return this.Model.update({
            totalComments: sequelize.literal('totalComments + 1'),
        }, {
            where: {
                id: ticketId,
            },
        });
    }

    updateTicketStatus(status, id) {
        return this.Model.update(
            { status: status },
            {
                where: {
                    id: id,
                },
            },
        );
    }

    updateNewAssignee(newId, ticketId) {
        return this.Model.update(
            { assigneeId: newId },
            {
                where: {
                    id: ticketId,
                },
            },
        );
    }

    updateNewRequester(newId, ticketId) {
        return this.Model.update(
            { userId: newId },
            {
                where: {
                    id: ticketId,
                },
            },
        );
    }
}

module.exports = TicketsData;
