const database = require("../config/database");

class Campanha {
    constructor() {
        this.model = database.db.define("campanha", {
            idCampanha: {
                type: database.db.Sequelize.STRING,
                primaryKey: true
            },
            nome: {
                type: database.db.Sequelize.STRING,
            },
            dt_inicio: {
                type: database.db.Sequelize.DATE,
            },
            dt_fim: {
                type: database.db.Sequelize.DATE,
            },
            ieSituacao: {
                type: database.db.Sequelize.STRING,
            },
        });
    }
}

module.exports = new Campanha().model;
