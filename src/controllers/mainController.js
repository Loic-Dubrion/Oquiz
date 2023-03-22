// IMPORTS DES MODULES
const { Quiz  } = require('../models');

const mainController = {

  async renderHomePage(req, res, next) {          
    try {                                           //! Méthode Models avec SEQUELIZE
      const quizzes = await Quiz.findAll({          // On récupère tous les quizz
        include: ["tags", "author"],                // On inclut les thèmes et les auteurs (via les clefs étrangères)
        order: [
          ["title", "ASC"]
        ],                  // On trie par ordrer alphabétique des titles de tag
      });
      // console.log(JSON.stringify(quizzes, null, 2));  
      res.render("home", { quizzes });              // On retourne la page  home avec notre objet
    } catch (err) {
      res.status(500);
    }
  },
  
};



module.exports = mainController;
