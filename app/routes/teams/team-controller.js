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
        // const test = await this.data.tickets.getTicketsByTeam(teamId);
        // console.log(tickets);
        for (let i = 0; i < tickets.length; i += 1) {
            tickets[i].dataValues.assignee = await this.data.users.findOneByIdUser(tickets[i].assigneeId);
            tickets[i].dataValues.requester = await this.data.users.findOneByIdUser(tickets[i].userId);
        }

        team.dataValues.tickets = await tickets;
        team.dataValues.tickets.assigneeId = await this.data.users.findOneByIdUser(tickets.assigneeId);
        team.dataValues.teamLeadUser = await this.data.users.findOneByIdUser(team.teamLead);
        return team;
    }
    getTeamId(name) {
        return this.data.teams.findByTeamName(name);
    }
    getTeamName(id) {
        return this.data.teams.getById(id);
    }

    async getAllUsersOnTeam(teamId, loggedUserId) {
        const teamUsers = await this.data.teams.getAllUsersByTeamId(+teamId, loggedUserId);
        if (!teamUsers) {
            return await this.data.teams.getAllUsersToAdd(+teamId, loggedUserId);
        }

        for (let i = 0; i < teamUsers.users.length; i += 1) {
            teamUsers.users[i].dataValues.name = teamUsers.users[i].firstName + ' ' + teamUsers.users[i].lastName;
        }
    
        return teamUsers;
    }

    async getUsersOutsideTheTeam(teamId, loggedUserId) {
        const teamMembers = await this.getAllUsersOnTeam(teamId, loggedUserId);
        const teamMembersIds = await Promise.all([teamMembers.users.map((user) => {
            return user.id;
        })]);

        const usersToAdd = await this.data.users.getAllAddMembers(teamMembersIds);

        for (let i = 0; i < usersToAdd.length; i += 1) {
            usersToAdd[i].dataValues.name = usersToAdd[i].firstName + ' ' + usersToAdd[i].lastName;
        }

        return usersToAdd;
    }

    async addNewMember(newMember) {
        const isValidUser = await this.data.users.findOneByIdUser(newMember.id);
        const team = await this.data.teams.getById(newMember.teamId);

        if (isValidUser) {
            this.data.teams.incrementMembers(newMember.teamId);
            team.addUsers([newMember.id]);
        }

        return isValidUser;
    }

    changeName(newNameObj) {
        this.data.teams.changeTeamName(newNameObj.name, newNameObj.teamId);
    }

    changeDescription(newDescriptionObj) {
        this.data.teams.changeTeamDescription(newDescriptionObj.description, newDescriptionObj.teamId);
    }

    changeTeamLeadUser(newUserObject) {
        this.data.teams.changeTeamLead(newUserObject.userId, newUserObject.teamId);
    }

    async leaveTeam(userToLeave) {
        const user = await this.data.users.getById(userToLeave.userId);

        if (user && user.password === userToLeave.confirmPassword) {
            const team = await this.data.teams.getById(userToLeave.teamId);
            this.data.teams.decrementTotalMembers(userToLeave.teamId);
            team.removeUsers([userToLeave.userId]);
            return true;
        }

        return false;
    }

    async removeUser(userToRemove) {
        const team = await this.data.teams.getById(userToRemove.teamId);
        team.removeUsers([userToRemove.userId]);
        this.data.teams.decrementTotalMembers(userToRemove.teamId);
    }

    async checkIfPartOfTeam(userToCheck) {
        const team = await this.data.teams.checkIfFromTeam(userToCheck.userId, userToCheck.teamId);

        if (team) {
            return true;
        }

        return false;
    }
}

module.exports = TeamController;