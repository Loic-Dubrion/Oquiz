const { Level } = require('../../models/index')

const adminLevelController = {

  async renderLevelPage(req, res, next) {
    try {
      const levels = await Level.findAll();
      // console.log(JSON.stringify(levels, null, 2));      
      res.render('admin/levels', { levels });
    } catch (err) {
      res.status(500);
    }
  },

  async actionNewLevel(req, res, next) {
    let { levelName } = req.body;           // On récupère les infos
    try {
      let levels = await Level.findAll();     // On récupère tous les levels
      // On uniformise le nom des niveaux
      levelName = levelName.toLowerCase();
      levelName = levelName.charAt(0).toUpperCase() + levelName.slice(1);
      // On vérifie que le champ est remplis
      if (!levelName) {                         
        return res.render('admin/levels', {levels, errorMsg: "Veuillez remplir le champ"});
      }
      
      // On vérifie qu'il s'agit bien d'un string de moins de 30 caractères
      if (typeof(levelName) !== 'string' && levelName.length > 30) {
        return res.render('admin/levels', {
          levels, errorMsg: "Veuillez entrer uniquement des lettres et une longueur de 30 caractère maximum."
        });
      }

      // On vérifie s'il existe déjà
      const existingLevel = await Level.findOne({
        where: {                            // On vérifie si le niveau existe déjà
          name: levelName
        }
      })
      if (existingLevel) {                 // S'il existe => errreur
        return res.render('admin/levels', {levels, errorMsg: "Le niveau existe déjà" });
      }

      // Créatiion du level
      await Level.create({ name: levelName }); //
      levels = await Level.findAll();     // On récupère tous les levels
      return res.render('admin/levels', {levels, succesMsg: "Le niveau a été enregistré avec succès."})
    } catch (err) {
      res.status(500);
    }
  },

  actionDeleteLevel: async (req, res, next) => {
    const levelId = req.params.id;
    try { 
      await Level.destroy({ 
        where: {
          id: levelId 
        }
      });
      const levels = await Level.findAll();     // On récupère tous les levels 
      return res.render('admin/levels', {levels, succesMsg: "Le niveau a bien été supprimé."});
    } catch (err) {
      res.status(500);
    }
  },

  renderUpdateLevel: async (req, res, next) => {
    try {
      const levelId = req.params.id;
      const level = await Level.findByPk( levelId, {
        where: {
          id: levelId
        }
      });
  // Si le level n'existe pas en DB : 404
      if (!level) { 
        return res.render("404");
      }
      
      res.render('admin/level', { level });
    } catch (err) {
      res.status(500);
    }
  },

  // Modification d'un niveau
  actionUpdateLevel: async (req, res, next) => {
    const levelId = req.params.id;
    const newName = req.body.name;
    try {
      const existingName = await Level.findOne({
        where: { name: newName }
      });
      if (existingName) {
        const level = await Level.findByPk( levelId, {
          where: {
            id: levelId
          }
        });
        res.render('admin/level', { level, errorMsg: "Ce nom est déjà pris." });
      } else {
        await Level.update(
          { name: newName },
          { where: { id: levelId } },
        );
        const levels = await Level.findAll();
        res.render('admin/levels', { levels, succesMsg: "Le niveau a bien été modifié."});
      }
    } catch (err) {
      res.status(500);
    }
  },

}

module.exports = adminLevelController;