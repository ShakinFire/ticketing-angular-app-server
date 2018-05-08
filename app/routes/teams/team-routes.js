const {
    Router,
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
        .post('/create-team', async (req, res) => {
            const team = req.body;
            const result = await TeamController.createTeam(team);

            res.json({
                result,
            });
        })
        .post('/addUserInTeam', async (req, res) => {
            const obj = req.body;
            const result = await TeamController.addUserInTeam(obj);

            res.json({
                result,
            });
        })
        .get('/getMyTeams', passport.authenticate('jwt', {
            session: false,
        }), async (req, res) => {
            const teams = await TeamController.getUserAllTeams(req.user.id);
            res.json({
                teams,
            });
        })
        .get('/getTeamAndTickets/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
            const team = await TeamController.getTeamAndTickets(req.params.id);
            res.json(
                team,
            );
        })
        .get('/getAllUsersOnTeam/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
            const users = await TeamController.getAllUsersOnTeam(req.params.id, req.user.id);
            res.json(users.users);
        })
        .get('/getAllUsersOutsideTheTeam/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
            const users = await TeamController.getUsersOutsideTheTeam(req.params.id, req.user.id);
            res.json(users);
        })
        .post('/newMember', passport.authenticate('jwt', { session: false }), async (req, res) => {
            const addMember = await TeamController.addNewMember(req.body);
            res.json(addMember);
        })
        .post('/updateTeamName', passport.authenticate('jwt', { session: false }), (req, res) => {
            TeamController.changeName(req.body);
            res.json({
                name: req.body.name,
            });
        })
        .post('/updateTeamDescription', passport.authenticate('jwt', { session: false }), (req, res) => {
            TeamController.changeDescription(req.body);
            res.json({
                name: req.body.description,
            });
        })
        .post('/updateTeamLead', passport.authenticate('jwt', { session: false }), (req, res) => {
            TeamController.changeTeamLeadUser(req.body);
            res.json({
                newTeamUser: req.body,
            });
        })
        .post('/userLeaveTeam', passport.authenticate('jwt', { session: false }), async (req, res) => {
            const isValid = await TeamController.leaveTeam(req.body);
            res.json({
                isValid,
            });
        })
        .post('/removeUserFromTeam', passport.authenticate('jwt', { session: false }), (req, res) => {
            TeamController.removeUser(req.body);
            res.json(req.body);
        })
        .post('/checkIfPartOfTeam', passport.authenticate('jwt', { session: false }), async (req, res) => {
            const isValid = await TeamController.checkIfPartOfTeam(req.body);
            res.json({
                isValid,
            });
        });
};

module.exports = {
    init,
};
