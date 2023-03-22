const { Tag } = require('../../models/index')


const adminTagController = {

  async renderTagsPage(req, res, next) {
    try {
      const tags = await Tag.findAll();
      console.log(JSON.stringify(tags, null, 2));
      res.render('admin/tags', { tags});
    } catch (err) {
      res.status(500);
    }
  },

  async actionNewTag(req, res, next) {
    let { tagName } = req.body;         // Je récupère le post

    try {
      let tags = await Tag.findAll();   // Récupère tous les tags

      tagName = tagName.toLowerCase();  // Uniformise le format
      tagName = tagName.charAt(0).toUpperCase() + tagName.slice(1);
      
      if (!tagName) {                   // Renvoi une erreur si le champ est vide  
        return res.render('admin/tags', {tags, errorMsg: "Veuillez remplir le champ"});
      }

      // On vérifie qu'il s'agit bien d'un string de moins de 30 caractères
      if (typeof(tagName) !== 'string' && tagName.length > 30) {
        return res.render('admin/tags', {
          tags, errorMsg: "Veuillez entrer uniquement des lettres et une longueur de 30 caractère maximum."
        });
      }

      // On vérifie s'il existe déjà
      const existingTag = await Tag.findOne({
        where: {                        // On vérifie si le thème existe déjà
          name: tagName
        }
      })
      if (existingTag) {              // S'il existe => errreur
        return res.render('admin/tags', {tags, errorMsg: "Le thème existe déjà" });
      }      

      // Création du tag
      await Tag.create({ name: tagName }); // Création en BDD du tag
      tags = await Tag.findAll();          // On récupère tous les tags
      return res.render('admin/tags', {tags, succesMsg: "Le niveau a été enregistré avec succès."})
    } catch (err) {
      res.status(500);
    }
  },

  async actionDeleteTag(req, res, next) {
    const tagId = req.params.id;
    try { 
      await Tag.destroy({ 
        where: {
          id: tagId 
        }
      });
      const tags = await Tag.findAll();     // On récupère tous les tags 
      return res.render('admin/tags', {tags, succesMsg: "Le niveau a bien été supprimé."});
    } catch (err) {
      res.status(500);
    }
  },

  async renderUpdateTag(req, res, next) {
    try {
      const tagId = req.params.id;
      const tag = await Tag.findByPk( tagId, {
        where: {
          id: tagId
        }
      });
  // Si le tag n'existe pas en DB : 404
      if (!tag) { 
        return res.render("404");
      }
  
      res.render('admin/tag', { tag });
    } catch (err) {
      res.status(500);
    }
  },

  // Modification d'un thème
  actionUpdateTag: async (req, res, next) => {
    const tagId = req.params.id;
    const newName = req.body.name;
    try {
      const existingName = await Tag.findOne({
        where: { name: newName }
      });
      if (existingName) {
        const tag = await Tag.findByPk( tagId, {
          where: {
            id: tagId
          }
        });
        res.render('admin/tag', { tag, errorMsg: "Ce nom est déjà pris." });
      } else {
        await Tag.update(
          { name: newName },
          { where: { id: tagId } },
        );
        const tags = await Tag.findAll();
        res.render('admin/tags', { tags, succesMsg: "Le niveau a bien été modifié."});
      }
    } catch (err) {
      res.status(500);
    }
  },  

}

module.exports = adminTagController