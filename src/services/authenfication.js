/**============================================================================
 * MIDDLEWARE D'AUTHENTIFICATION
 *============================================================================*/

const authMiddleware = {

  authAdmin (req, res, next) {                    //! Vérification du role Administrateur
    if (!req.session.user) {                      // Si l'utilisateur n'est pas connecté
      return res.redirect("/login");              // => On redirige sur la page login
    }
  
    if (req.session.user.role !== "admin") {      // Si il n'est pas admin
      return res.status(403).render('errors/403');// On reetourne une erreur 403
    }

    next();                                       // Sinon, on laisse passer
  },

  authUser (req, res, next) {
    if (!req.session.user) {
      return res.redirect("/login"); // => On redir
    }

    next();
  }
}

module.exports = authMiddleware;