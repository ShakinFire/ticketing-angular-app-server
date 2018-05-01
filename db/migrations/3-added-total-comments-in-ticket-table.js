'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "totalComments" to table "tickets"
 *
 **/

var info = {
    "revision": 3,
    "name": "added-total-comments-in-ticket-table",
    "created": "2018-04-30T22:10:33.961Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "tickets",
        "totalComments",
        {
            "type": Sequelize.INTEGER,
            "defaultValue": 0,
            "allowNull": false
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
