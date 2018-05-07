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
        const userId = team.teamLead;
        const tea = await this.data.teams.create(team);
        await tea.addUsers([userId]);
        this.data.teams.incrementMembers(tea.id);
        return tea;
    }

    async addUserInTeam(obj) {
        const userId = obj.userId;
        const team = await this.data.teams.findByTeamName(obj.team);
        await team.addUsers([userId]);
        this.data.teams.incrementMembers(team.id);
        return team;
    }

    async getTeamAndTickets(teamId) {
        const team = await this.data.teams.getById(+teamId);
        const tickets = await team.getTickets();
        console.log(tickets);
        Promise.all([tickets.forEach(async (ticket) => {
            ticket.dataValues.assignee = await this.data.users.findOneByIdUser(ticket.assigneeId);
            ticket.dataValues.requester = await this.data.users.findOneByIdUser(ticket.userId);
        })]);
        team.dataValues.tickets = await tickets;
        team.dataValues.tickets.assigneeId = await this.data.users.findOneByIdUser(tickets.assigneeId);
        team.dataValues.teamLeadUser = await this.data.users.findOneByIdUser(team.teamLead);
        return team;
    }
    getTeamId(name) {
        return this.data.teams.findByTeamName(name);
    }
}

module.exports = TeamController;