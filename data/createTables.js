/* =================================================================
* PEUT REMPLACER LES FICHIER ;sql
================================================================= */


// Import des models
const { User, Tag, Question } = require("../src/models");


// Création des tables de données
async function createTables() {
  await User.sync();
  await Tag.sync();
  await Question.sync();
}

// Peuplement des tables
async function populateTables() {
  await User.bulkCreate([   // enregistre dans une table de la base de données en une seule requête SQL. 
    { id: 90, firstname: "John", lastname: "Doe", email: "john@oclock.io", password: '123' },
    { id: 91, firstname: "Jeannet", lastname: "Doe", email: "jeannet@oclock.io", password: "456" },
  ]);
}

// createTables();

populateTables();
