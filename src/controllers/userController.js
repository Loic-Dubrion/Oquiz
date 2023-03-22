const { User } = require('../models');
const validator = require('validator');
const bcrypt = require('bcrypt');


const userController = {
  
  // Affichage de la page inscription
  renderSignupPage(req, res, next) {
    try {
      res.render('signup')
    } catch (err) {
      res.status(500);
    }
  },
  
  // Affichage de la page login
  renderLoginPage(req, res, next) {
    try {
      res.render('login');
    } catch (err) {
      res.status(500);
    }
  },

  // Affiche la page profil
  renderProfilePage(req, res, next) {
    try {
      const user = req.session.user;  // On stocke la session
      if (!user) {                    // Si la session est vide 
        return res.status(401)        // On retourne une erreur 401
      } 
      res.render('profile', { user });// On affichage le profil 
    } catch (err) {
      res.status(500);
    }
  },

  // Méthode pour la logique d'inscription
  async actionSignup(req, res, next) {

    // 1. recup les infos du formulaire
    //* On n'oublie pas de branche le MW de body-parsing
    const { firstname, lastname, email, password, confirmation } = req.body;

    // 2. Verif que c'est bien renseigné
    if (!firstname || !lastname || !email || !password) {
      return res.render("signup", { errorMsg: "Veuillez renseigner tous les champs" });
    }

    // 3. Validation de type pour l'email
    if (!validator.isEmail(email)) {
      return res.render("signup", { errorMsg: "Veuillez renseigner un email correct" });
    }

    // 4. vérif que le mdp est assez fort
    if (!validator.isStrongPassword(password)) {
      return res.render("signup", { errorMsg: "Veuillez renseigner un mdp plus fort" });
    }

    // 5. vérif confirmation du mdp
    if (password !== confirmation) {
      return res.render("signup", { errorMsg: "Confirmation du mdp erronée" });
    }

    // 6. Vérif l'email est libre en DB
    const existingUser = await User.findOne({
      where: {
        email: email,
      }
    });
    if (existingUser) {
      return res.render("signup", { errorMsg: "L'email est déjà pris" });
    }

    // 7. Hash le mdp
    // Le deuxième argument permert de générer une string aléatoire 
    // afin de rendre le hash final encore plus sécurisé
    const hashedPassword = await bcrypt.hash(password, 10); 

    // 8. Enrigstrement du nouvel user en DB
    await User.create({ firstname, lastname, email, password: hashedPassword });
    
    // 9. On redirige sur la page de connexion
    res.redirect('/login');
    
  },

  // Méthode pour la logique de connexion
  async actionLogin(req, res, next) {
    const { email, password } = req.body;   // 1. On recup les infos du body

    const user = await User.findOne({       // 2. On verif si le user existe en DB (via l'email)
      where: { email: email } 
    });
    if (!user) {
      return res.render("login", { errorMsg: "Mauvais couple login/mdp" });
    }

    const isGoodPassword = await bcrypt.compare(password, user.password); 
    if (!isGoodPassword) {                  // 3. On verif que le mdp tapé corresponde à hash en DB
      return res.render("login", { errorMsg: "Mauvais couple login/mdp" });
    }
    
    req.session.user = user;                // 4. On connecte l'utilisateur avec la mecanique de session
    delete req.session.user.password;       // mais on supprime son mdp !
    res.redirect("/");                      // 5. On redirige sur la page home
  },

  actionLogout(req, res, next) {
    try {
      req.session.user = null;    // Pour déco un utilisateur, on vide session.user
      res.redirect("/");          // On redirige sur la Home
    } catch (err) {
      res.status(403);
    }
  },

}

module.exports = userController;