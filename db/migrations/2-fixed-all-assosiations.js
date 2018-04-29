'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "usersId" from table "comments"
 * removeColumn "ticketsId" from table "comments"
 * removeColumn "usersId" from table "notifications"
 *
 **/

var info = {
    "revision": 2,
    "name": "fixed-all-assosiations",
    "created": "2018-04-29T15:26:25.691Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["comments", "usersId"]
    },
    {
        fn: "removeColumn",
        params: ["comments", "ticketsId"]
    },
    {
        fn: "removeColumn",
        params: ["notifications", "usersId"]
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
