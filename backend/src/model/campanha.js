const database = require("../config/database");

class Campanha {
    constructor() {
        this.model = database.db.define("campanha", {
            idCampanha: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
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
            situacao: {
                type: database.db.Sequelize.BOOLEAN,
            },
        },{
            freezeTableName: true
        });
    }
}

module.exports = new Campanha().model;
