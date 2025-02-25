const database = require("../config/database");

class Organization {
    constructor() {
        this.model = database.db.define("organization", {
            idOrganization: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            organization: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
            },
            idPerson: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'person',
                    key: 'idPerson'
                }
            },
            idAdress: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'adress',
                    key: 'idAdress'
                },
            }
        }, {
            freezeTableName: true
        });
    }
}

module.exports = new Organization().model;