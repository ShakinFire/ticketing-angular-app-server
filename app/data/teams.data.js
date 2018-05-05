const Data = require('./generic.data');
const sequelize = require('sequelize');
const {
    users,
} = require('../../db/models');
class TeamsData extends Data {
    constructor(teamModel) {
        super(teamModel);
    }

    findByTeamName(teamname) {
        const currentTeam = this.Model.findOne({
            where: {
                name: teamname,
            },
        });
        return currentTeam;
    }

    isObjValid(obj) {
        return obj;
    }

    getByTeamAllUsers(name) {
        return this.Model.findAll({
            where: {
                name: name,
            },
            include: [users]

        });
    }

    getByUserAllTeams(id) {
        return this.Model.findAll({
            include: [{
                model: users,
                through: {
                    where: {
                        userId: id,
                    },
                },
            }],
        });
    }

    testing(id) {
        return this.Model.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: users,
                }
            ],
        });
    }

    incrementMembers(id) {
        this.Model.update({
            totalMembers: sequelize.literal('totalMembers + 1'),
        }, {
            where: {
                id: id,
            },
        });
    }
}

module.exports = TeamsData;