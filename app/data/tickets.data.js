const Data = require('./generic.data');
<<<<<<< HEAD
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// const timezone = 'Europe/Vilnius'

// require('moment').tz.setDefault(timezone)

=======
const sequelize = require('sequelize');
>>>>>>> ae6c1268c82472a19a3ac0a6dd3cbdb74f4d9fec
const {
    users,
    comments,
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
<<<<<<< HEAD
    getTicketsByDate() {
        return this.Model.findAll({
            where: {
                estimated: {
                    [Op.lte]: (new Date() + 48 * 60 * 60 * 1000)
                }
            }
        })
=======

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
>>>>>>> ae6c1268c82472a19a3ac0a6dd3cbdb74f4d9fec
    }
}

module.exports = TicketsData;