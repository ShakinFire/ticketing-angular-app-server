'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "assignee" from table "tickets"
 * addColumn "assigneeId" to table "tickets"
 *
 **/

var info = {
    "revision": 2,
    "name": "changed-assignee-to-be-an-id",
    "created": "2018-04-25T14:03:26.659Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["tickets", "assignee"]
    },
    {
        fn: "addColumn",
        params: [
            "tickets",
            "assigneeId",
            {
                "type": Sequelize.INTEGER,
                "allowNull": false
            }
        ]
    }
];

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
