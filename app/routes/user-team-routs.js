const UsersTeamsControler = require('../controllers/users-teams-controler');
const {
    Router
} = require('express');


const init = (app, data) => {
    const controller = new UsersTeamsControler(data);
    const router = new Router();

    app.use('/api', router);

    router
        .get('/user-teams/:id', async (req, res) => {

            // const obj = req.body;
            const id = req.params.id;
            // console.log(obj);
            const result = await controller.getUserAllTeams(id);
            const teams = result.map(x => x.name);

            res.json({
                teams,
            });
        })
        .get('/teams-users/:team', async (req, res) => {


            const name = req.params.team;

            const result = await controller.getTeamAllUsers(name);
            const users = result[0].users.map(x => (x.firstName + ' ' + x.lastName));

            res.json({
                users
            });
        });
};

module.exports = {
    init,
};