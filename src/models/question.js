const { DataTypes, Model } = require('sequelize'); // Import des classes du module sequelize
const sequelize = require('../databaseSequelize'); // Connexion de Sequelize vers Postgres

class Question extends Model {}

Question.init({
  question: {
    type: DataTypes.STRING,
    allowNull: false
  },
  anecdote: DataTypes.STRING,
  wiki: DataTypes.STRING,
}, {
  sequelize,
  tableName: 'question'
});

module.exports = Question;
