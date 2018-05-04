class TeamController {
    constructor(data) {
        this.data = data;
    }

    async getUserAllTeams(id) {
        const user = await this.data.users.getById(id);
        return user.getTeams();
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

    async getTeamAndTickets(teamId) {
        const team = await this.data.teams.getById(+teamId);
        const tickets = team.getTickets();
        team.dataValues.tickets = await tickets;
        console.log(tickets);
        console.log(team);
        return team;
    }
}

module.exports = TeamController;
