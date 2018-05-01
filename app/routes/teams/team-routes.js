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

            // const obj = req.body;
            const id = req.params.id;
            // console.log(obj);
            const result = await TeamController.getUserAllTeams(id);
            const teams = result.map(x => x.name);

            res.json({
                teams,
            });
        })
        .get('/teams-users/:team', async (req, res) => {


            const name = req.params.team;

            const result = await TeamController.getTeamAllUsers(name);
            const users = result[0].users.map(x => ({
                id: x.id,
                name: x.firstName + ' ' + x.lastName
            }));

            res.json({
                users,
            });
        })
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
};

module.exports = {
    init,
};