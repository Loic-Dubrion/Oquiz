/* ========================================================================================
 * STOCKAGE DE l'UTILISATEUR DANS LES LOCALS 
 * Permet d'utiliser la variable "user" dans toutes les views sans se poser de questions
 ======================================================================================== */
 
const userMiddleware = (req, res, next) => {
  if (req.session.user) {                    // Si un utilisateur est connecté
    res.locals.user = req.session.user;      // On le mémorise dans res.locals
  } else {
    res.locals.user = false;                 // Sinon res.locals return false
  }

  next();                                    // On a remplis notre locals.user, on continue
}

module.exports = userMiddleware              // Export du middleware