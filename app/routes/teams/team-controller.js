class TeamController {
    constructor(data) {
        this.data = data;
    }

    async getUserAllTeams(id) {
        return await this.data.teams.getByUserAllTeams(id);
    }

    async getTeamAllUsers(name) {
        return await this.data.teams.getByTeamAllUsers(name);
    }
    async createTeam(team) {
        const userId = team.userId;
        const tea = await this.data.teams.create(team);
        await tea.addUsers([userId]);
        return tea;

    }
    async addUserInTeam(obj) {
        const userId = obj.userId;
        const team = await this.data.teams.findByTeamName(obj.team);
        await team.addUsers([userId]);
        return team;
    }

}
module.exports = TeamController;