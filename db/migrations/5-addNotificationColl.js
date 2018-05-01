'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "nameTipe" to table "notifications"
 * addColumn "type" to table "notifications"
 *
 **/

var info = {
    "revision": 5,
    "name": "addNotificationColl",
    "created": "2018-04-30T18:16:28.273Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "notifications",
            "nameType",
            {
                "type": Sequelize.STRING
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "notifications",
            "type",
            {
                "type": Sequelize.STRING,
                "allowNull": false
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function (queryInterface, Sequelize) {
        var index = this.pos;
        return new Promise(function (resolve, reject) {
            function next() {
                if (index < migrationCommands.length) {
                    let command = migrationCommands[index];
                    console.log("[#" + index + "] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                } else
                    resolve();
            }
            next();
        });
    },
    info: info
};