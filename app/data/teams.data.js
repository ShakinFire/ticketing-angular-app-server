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

    incrementMembers(id) {
        this.Model.update({
            totalMembers: sequelize.literal('totalMembers + 1'),
        }, {
            where: {
                id: id,
            },
        });
    }

    getAllUsersByTeamId(teamId) {
        return this.Model.findOne({
            where: {
                id: teamId,
            },
            include: [
                {
                    model: users,
                    attributes: {
                        exclude: ['password', 'updatedAt', 'createdAt', 'email']
                    },
                },
            ],
        });
    }

    changeTeamName(newName, teamId) {
        this.Model.update(
            {
                name: newName,
            },
            {
                where: {
                    id: teamId,
                },
            }
        );
    }

    changeTeamDescription(newDescription, teamId) {
        this.Model.update(
            {
                description: newDescription,
            },
            {
                where: {
                    id: teamId,
                },
            }
        );
    }

    changeTeamLead(newTeamLeadId, teamId) {
        this.Model.update(
            {
                teamLead: newTeamLeadId,
            },
            {
                where: {
                    id: teamId,
                },
            }
        );
    }

    decrementTotalMembers(teamId) {
        this.Model.update({
            totalMembers: sequelize.literal('totalMembers - 1'),
        }, {
            where: {
                id: teamId,
            },
        });
    }

    checkIfFromTeam(userId, teamId) {
        return this.Model.findOne({
            where: {
                id: teamId,
            },
            include: [
                {
                    model: users,
                    where: {
                        id: userId,
                    },
                },
            ],
        });
    }
}

module.exports = TeamsData;