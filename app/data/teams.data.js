const Data = require('./generic.data');

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
}

module.exports = TeamsData;