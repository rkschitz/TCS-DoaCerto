const database = require("../config/database");

class UserBreed {
  constructor() {
    this.model = database.db.define("user_breed", {
      id: {
        type: database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: database.db.Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      breedId: {
        type: database.db.Sequelize.STRING,
        references: {
          model: 'breeds',
          key: 'breedId'
        }
      },
      isCreated: {
        type: database.db.Sequelize.BOOLEAN,
        allowNull: false
      }
    });
  }
}

module.exports = new UserBreed().model;
