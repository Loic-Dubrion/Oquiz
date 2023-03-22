const { DataTypes, Model } = require('sequelize'); // Import des classes du module sequelize
const sequelize = require('../databaseSequelize'); // Connexion de Sequelize vers Postgres

class Quiz extends Model {}

Quiz.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'quiz'
});

module.exports = Quiz;
