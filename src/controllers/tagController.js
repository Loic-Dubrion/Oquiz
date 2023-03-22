const { Tag } = require('../models');

const tagController = {

  async renderTagsPage(req, res, next) {
    try {
      // On veut recup tous les thèmes avec leurs quizzes associés
      const tags = await Tag.findAll({
        include: "quizzes",
        order : [
          ["name", "ASC"],
          ["quizzes", "title", "ASC"], // tri des quizzes par titre
        ]
      });
      // console.log(JSON.stringify(tags, null, 2));
      res.render("tags", { tags });
    } catch (err) {
      res.status(500);
    }
  },

}

module.exports = tagController;
