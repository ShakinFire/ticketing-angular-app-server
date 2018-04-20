const init = (app, data) => {
    app.get('/api/users', (req, res) => {
        // auth validations

        // call controllers
        
        // send data
        const obj = {
            name: 'Gosho',
            age: 23,
        };
        res.send(obj);
    });
};

module.exports = {
    init,
};
