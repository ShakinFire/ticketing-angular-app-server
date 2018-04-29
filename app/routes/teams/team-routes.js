const {
    Router
} = require('express');
const Tcontroller = require('./team-controller');
const passport = require('passport');

const init = (app, data) => {
    const TeamController = new Tcontroller(data);
    const router = new Router();

    app.use('/api', router);

    router
        .get('/user-teams/:id', async (req, res) => {
            const id = req.params.id;
            const result = await TeamController.getUserAllTeams(id);
            const teams = result.map((x) => {
                return x.name;
            });

            res.json({
                teams,
            });
        })
        .get('/teams-users/:team', async (req, res) => {


            const name = req.params.team;

            const result = await TeamController.getTeamAllUsers(name);
            const users = result[0].users.map(x => ({
                id: x.id,
                name: x.firstName + ' ' + x.lastName,
            }));

            res.json({
                users,
            });
        })
        .get('/getMyTeams', passport.authenticate('jwt', { session: false }), async (req, res) => {
            const teams = await TeamController.getUserAllTeams(req.user.id);
            res.json({
                teams,
            });
        });
};

module.exports = {
    init,
};