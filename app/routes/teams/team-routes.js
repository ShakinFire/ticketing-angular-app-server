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
<<<<<<< HEAD
        .post('/create-team', async (req, res) => {
            const team = req.body;

            const result = await TeamController.createTeam(team)

            res.json({
                restult
            });
        })
        .post('/addUserInTeam', async (req, res) => {
            const obj = req.body;
            const result = await TeamController.addUserInTeam(obj);

            res.json({
                result
            });
        })
=======
        .get('/getMyTeams', passport.authenticate('jwt', { session: false }), async (req, res) => {
            const teams = await TeamController.getUserAllTeams(req.user.id);
            res.json({
                teams,
            });
        });
>>>>>>> ae6c1268c82472a19a3ac0a6dd3cbdb74f4d9fec
};

module.exports = {
    init,
};