class UserController {
    constructor(data) {
        this.data = data;
    }

    _validate(user) {
        const message = null;
        if (user.firstName.length < 2 || user.lastName.length < 2) {
            message = 'Name must be at least 2 characters';
        }

        if (user.password.length < 6) {
            message = 'Password must be at least 6 characters';
        }
        // should be regex check, this is just for testing purpose
        if (user.email.length < 5) {
            message = 'Invalid email';
        }

        return message;
    }

    async checkUser(email) {
        return await this.data.users.getByEmail(email);
    }

    async regValidation(userToCreate) {
        const isValid = this._validate(userToCreate);
        let result = null;

        if (isValid) {
            return result;
        }

        try {
            result = await this.data.users.create(userToCreate);
        } catch (err) {
            result = err.message;
        }

        return result;
    }
    async getAllUsersIdName() {
        return await this.data.users.getAll();
    }
    async getUserId(name) {
        console.log(name);
        const user = await this.data.users.findByUserName(name);
        console.log(user.id);
        return user.id;
    }
}

module.exports = UserController;