'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "usersId" to table "tickets"
 *
 **/

var info = {
    "revision": 3,
    "name": "fixed-user-to-tickets-assosication",
    "created": "2018-04-25T15:24:34.255Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "tickets",
        "usersId",
        {
            "type": Sequelize.INTEGER,
            "onUpdate": "CASCADE",
            "onDelete": "SET NULL",
            "references": {
                "model": "users",
                "key": "id"
            },
            "allowNull": true
        }
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
