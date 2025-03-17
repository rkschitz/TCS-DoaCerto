const database = require("../config/database");

class Grantee {
    constructor() {
        this.model = database.db.define("grantee", {
            idGrantee: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            idPerson: {
                type: database.db.Sequelize.INTEGER,
                references:{
                    model: 'person',
                    key: 'idPerson'
                }
            },
            ieAcceptTerm:{
                type: database.db.Sequelize.BOOLEAN,
                allowNull: false
            }
            
        },{
            freezeTableName: true
        });
    }
}

module.exports = new Grantee().model;
