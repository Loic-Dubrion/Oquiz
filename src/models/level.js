const { DataTypes, Model } = require('sequelize'); // Import des classes du module sequelize
const sequelize = require('../databaseSequelize'); // Connexion de Sequelize vers Postgres

class Level extends Model {}

Level.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  tableName: 'level'
});

module.exports = Level;