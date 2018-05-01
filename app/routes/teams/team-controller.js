class TeamController {
    constructor(data) {
        this.data = data;
    }

    async getUserAllTeams(id) {
        const user = await this.data.users.getById(id);
        return user.getTeams();
        // return await this.data.teams.getByUserAllTeams(id);
    }

    async getTeamAllUsers(name) {
        return await this.data.teams.getByTeamAllUsers(name);
    }
}
module.exports = TeamController;