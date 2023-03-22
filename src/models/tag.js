const { DataTypes, Model } = require('sequelize'); // Import des classes du module sequelize
const sequelize = require('../databaseSequelize'); // Connexion de Sequelize vers Postgres

class Tag extends Model {}       // On crée notre modèle Sequelize en héritant de son Model

Tag.init({                       // 1er {} On renseigne les attributs
  name: {                        // Pas besoin d'implémenter l'Id. Squelize s'en occupe
    type: DataTypes.STRING,      // La colonne name sera un string
    allowNull: false,            // Dont la valeur pourra être null
  }
}, {                             // 2nd {} On ajoute les options
  sequelize,                     // objet client lien avec la BDD
  tableName: "tag",              // On s'assure d'avoir le bon nom de table
});

module.exports = Tag;