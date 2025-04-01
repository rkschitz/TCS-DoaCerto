const database = require("../config/database");

class Logradouro {
    constructor() {
        this.model = database.db.define("logradouro", {
            idLogradouro: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            cep: {
                type: database.db.Sequelize.STRING,
            },
            logradouro: {
                type: database.db.Sequelize.STRING,
            },
            bairro: {
                type: database.db.Sequelize.STRING,
            },
            cidade: {
                type: database.db.Sequelize.STRING,
            },
            estado: {
                type: database.db.Sequelize.STRING,
            }
        },{
            freezeTableName: true
        });
    }
}

module.exports = new Logradouro().model