const { DataTypes, Model } = require('sequelize');  // Import des classes du module sequelize
const sequelize = require('../databaseSequelize');  // Connexion de Sequelize vers Postgres

class Answer extends Model {}      // !Définition d'une classe Answer qui étend la classe Model de Sequelize.

Answer.init({
  description: {                   // !Initialisation de la classe Answer avec les attributs suivants :
    type: DataTypes.STRING,        // Définition de l'attribut description 
    allowNull: false               // de type STRING (chaine de caractères) 
  },                               // et qui ne peut pas être nul (allowNull: false).
  
}, {                               // !Définition d'options pour le modèle :
  sequelize,                       // Utilisation de l'objet sequelize pour définir le modèle.
  tableName: 'answer',             // Nom de la table PostgreSQL où seront stockées les réponses.    
  
  // ! Option définit en global dans le databaseSequelize.js
  // timestamps: true,                // Ajout automatique de deux attributs created_at et updated_at pour le suivi des dates de création et de modification de chaque réponse.
  // createdAt: 'created_at',         // Renommage de l'attribut created_at en created_at.
  // updatedAt: 'updated_at',         // Renommage de l'attribut updated_at en updated_at.
});

module.exports = Answer;           // Export de la classe Answer pour pouvoir l'utiliser dans d'autres fichiers.
