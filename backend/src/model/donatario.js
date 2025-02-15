const database = require("../config/database");

class Donatario {
    constructor() {
        this.model = database.db.define("donatario", {
            idDonatario: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true
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
            
        });
    }
}

module.exports = new Donatario().model;
