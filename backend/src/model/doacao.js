const database = require("../config/database");

class Doacao {
    constructor() {
        this.model = database.db.define("doacao", {
            idDoacao: {
                type: database.db.Sequelize.STRING,
                primaryKey: true
            },
            idDoador: {
                type: database.db.Sequelize.INTEGER,
                references:{
                    model: 'doador',
                    key: 'idDoador'
                }
            },
            idCampanha: {
                type: database.db.Sequelize.INTEGER,
                references:{
                    model: 'campanha',
                    key: 'idCampanha'
                }
            },
        });
    }
}

module.exports = new Doacao().model;
