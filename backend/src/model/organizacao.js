const database = require("../config/database");

class Organizacao {
    constructor(){
        this.model = database.db.define("alimento", {
            idOrganizacao:{
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            organizacao:{
                type: database.db.Sequelize.STRING,
            },
            cnpj:{
                type: database.db.Sequelize.STRING,
            },
            telefone:{
                type: database.db.Sequelize.STRING,
            },
            email:{
                type: database.db.Sequelize.STRING,
            },
            senha:{
                type: database.db.Sequelize.STRING,
            },
            role:{
                type: database.db.Sequelize.STRING,
                defaultValue: 'O'
            },
            ieSituacao:{
                type: database.db.Sequelize.STRING,
            },
            
        },{
            freezeTableName: true
        });
    }
}

module.exports = new Organizacao().model;