'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "totalMembers" to table "teams"
 * addColumn "description" to table "teams"
 * addColumn "userId" to table "teams"
 *
 **/

var info = {
    "revision": 2,
    "name": "added-assositaion-and-fields-in-teams-table",
    "created": "2018-05-03T22:51:32.461Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "teams",
            "totalMembers",
            {
                "type": Sequelize.INTEGER,
                "defaultValue": 0,
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "teams",
            "description",
            {
                "type": Sequelize.STRING
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "teams",
            "userId",
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
