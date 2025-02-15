const database = require("../config/database");

class Breed {
    constructor() {
        this.model = database.db.define("breeds", {
            breedId: {
                type: database.db.Sequelize.STRING,
                primaryKey: true
            },
            name: {
                type: database.db.Sequelize.STRING,
            },
            weight: {
                type: database.db.Sequelize.STRING,
            },
            life_span: {
                type: database.db.Sequelize.STRING,
            },
            origin: {
                type: database.db.Sequelize.STRING,
            },
            temperament: {
                type: database.db.Sequelize.STRING,
            },
            image: {
                type: database.db.Sequelize.STRING,
            }
        });
    }
}

module.exports = new Breed().model;
