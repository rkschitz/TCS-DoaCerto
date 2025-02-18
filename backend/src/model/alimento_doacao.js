const database = require("../config/database");

class AlimentoDoacao {
    constructor() {
        this.model = database.db.define("alimento_doacao", {
            idAlimentoDoacao: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            idDoacao: {
                type: database.db.Sequelize.INTEGER,
                references:{
                    model: 'doacao',
                    key: 'idDoacao'
                }
            },
            idAlimento: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'alimento',
                    key: 'idAlimento'
                }
            },
            idUnidadeMedida:{
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'unidade_medida',
                    key: 'idUnidadeMedida'
                }
            },
            quantidade: {
                type: database.db.Sequelize.STRING,
            },
            dtValidade: {
                type: database.db.Sequelize.DATE,
            },
        },{
            freezeTableName: true
        });
    }
}

module.exports = new AlimentoDoacao().model;
