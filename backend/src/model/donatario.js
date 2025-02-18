const database = require("../config/database");

class Donatario {
    constructor() {
        this.model = database.db.define("donatario", {
            idDonatario: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            idPessoa: {
                type: database.db.Sequelize.INTEGER,
                references:{
                    model: 'pessoa',
                    key: 'idPessoa'
                }
            },
            ieAceitaTermo:{
                type: database.db.Sequelize.BOOLEAN,
                allowNull: false
            }
            
        },{
            freezeTableName: true
        });
    }
}

module.exports = new Donatario().model;
