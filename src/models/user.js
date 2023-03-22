const { DataTypes, Model } = require('sequelize'); // Import des classes du module sequelize
const sequelize = require('../databaseSequelize'); // Connexion de Sequelize vers Postgres

class User extends Model {}

User.init({
  firstname: {
    type: DataTypes.STRING,
  },
  lastname: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
}, {
  sequelize,
  tableName: 'user'
});

module.exports = User;