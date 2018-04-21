class UserController {
    constructor(data) {
        this.data = data;
    }

    _validate(user) {
        if (user.firstName.length < 2 || user.lastName.length < 2 ||
            user.password.length < 6) {
            return false;
        }

        // should be regex check, this is just for testing purpose
        if (user.email.length < 5) {
            return false;
        }

        return true;
    }

    async checkUser(email) {
        return await this.data.users.getByEmail(email);
    }

    async regValidation(userToCreate) {
        const isValid = this._validate(userToCreate);
        let result = null;

        if (isValid) {
            result = await this.data.users.create(userToCreate);
        } else {
            result = 'Invalid data';
        }

        return result;
    }
}

module.exports = UserController;
