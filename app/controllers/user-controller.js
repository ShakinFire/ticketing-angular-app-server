class UserController {
    constructor(data) {
        this.data = data;
    }

    async checkUser(email) {
        return await this.data.users.getByEmail(email);
    }
}

module.exports = UserController;
