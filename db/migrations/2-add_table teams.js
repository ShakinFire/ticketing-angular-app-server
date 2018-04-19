'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "Tickets"
 * dropTable "Users"
 * createTable "teams", deps: []
 * createTable "tickets", deps: []
 * createTable "users", deps: []
 * createTable "teamUsers", deps: [teams, users]
 *
 **/

var info = {
    "revision": 2,
    "name": "add table teams",
    "created": "2018-04-18T10:06:15.668Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "dropTable",
        params: ["Tickets"]
    },
    {
        fn: "dropTable",
        params: ["Users"]
    },
    {
        fn: "createTable",
        params: [
            "teams",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "allowNull": false,
                    "unique": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "tickets",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "title": {
                    "type": Sequelize.STRING,
                    "allowNull": false,
                    "unique": true
                },
                "description": {
                    "type": Sequelize.TEXT,
                    "allowNull": false
                },
                "labels": {
                    "type": Sequelize.STRING,
                    "allowNull": false,
                    "unique": true
                },
                "status": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "estimated": {
                    "type": Sequelize.INTEGER,
                    "allowNull": false
                },
                "requerter": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "assignee": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "team": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "attach": {
                    "type": Sequelize.TEXT
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "userName": {
                    "type": Sequelize.STRING,
                    "allowNull": false,
                    "unique": true
                },
                "password": {
                    "type": Sequelize.STRING,
                    "allowNull": false,
                    "unique": true
                },
                "email": {
                    "type": Sequelize.STRING,
                    "allowNull": false,
                    "unique": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "teamUsers",
            {
                "teamId": {
                    "type": Sequelize.INTEGER,
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "teams",
                        "key": "id"
                    },
                    "unique": "teamUsers_userId_teamId_unique",
                    "primaryKey": true
                },
                "userId": {
                    "type": Sequelize.INTEGER,
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "unique": "teamUsers_userId_teamId_unique",
                    "primaryKey": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
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
