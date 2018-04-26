const Data = require('./generic.data');

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
                where: {
                    id: id,
                }
            }]
        });
    }
}

module.exports = TeamsData;