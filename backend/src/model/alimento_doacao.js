const database = require("../config/database");

class AlimentoDoacao {
    constructor() {
        this.model = database.db.define("alimento_doacao", {
            idAlimentoDoacao: {
                type: database.db.Sequelize.STRING,
                primaryKey: true
            },
            idDoacao: {
                type: database.db.Sequelize.STRING,
                references:{
                    model: 'doacao',
                    key: 'idDoacao'
                }
            },
            idAlimento: {
                type: database.db.Sequelize.STRING,
                references: {
                    model: 'alimento',
                    key: 'idAlimento'
                }
            },
            quantidade: {
                type: database.db.Sequelize.STRING,
            },
            dtValidade: {
                type: database.db.Sequelize.DATE,
            },
            idUnidadeMedida:{
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'unidade_medida',
                    key: 'idUnidadeMedida'
                }
            }
        });
    }
}

module.exports = new AlimentoDoacao().model;
