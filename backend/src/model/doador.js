const database = require("../config/database");

class Doador {
    constructor() {
        this.model = database.db.define("doador", {
            idDoador: {
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
            }
        },{
            freezeTableName: true
        });
    }
}

module.exports = new Doador().model;
