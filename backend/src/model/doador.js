const database = require("../config/database");

class Doador {
    constructor() {
        this.model = database.db.define("doador", {
            idDoador: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true
            },
            idPessoa: {
                type: database.db.Sequelize.INTEGER,
                references:{
                    model: 'pessoa',
                    key: 'idPessoa'
                }
            }
        });
    }
}

module.exports = new Doador().model;
