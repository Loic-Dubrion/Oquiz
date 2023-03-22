// const { Router } = require("express");

// const mainController = require("../controllers/mainController");

// const quizController = require("../controllers/quizController");
// const tagController = require("../controllers/tagController.js");
// const userController = require("../controllers/userController.js");

// const adminLevelController = require("../controllers/admin/adminLevelController.js");
// const adminController = require("../controllers/admin/adminController.js");
// const adminTagController = require("../controllers/admin/adminTagController.js");

// const authMiddleware = require("../services/authenfication");



// const router = Router();

// // home
// router.get("/", mainController.renderHomePage);

// // Quiz
// router.use("/quiz", authMiddleware.authUser);
// router.get("/quiz/:id", quizController.renderQuizPage);

// // Tags
// router.use("/tags", authMiddleware.authUser);
// router.get("/tags", tagController.renderTagsPage);

// // User
// router.get("/signup", userController.renderSignupPage); // Affiche la page d'inscription
// router.post("/signup", userController.actionSignup);    // Traite l'inscription 

// router.get("/login", userController.renderLoginPage);   // affichage de la page de connexion
// router.post("/login", userController.actionLogin);      // Traitement du formulaire de connexion

// router.get("/profil", userController.renderProfilePage);

// router.get("/logout", userController.actionLogout);     // affichage de la page de connexion

// // Admin
// // On vient brancher le middleware de verif du role admin pour toutes les routes (toutes méthodes)
// router.use("/admin", authMiddleware.authAdmin);    // Bloque toutes les routes qui commence par admin
// router.get("/admin", adminController.renderAdminPage);

// // Level
// router.get("/admin/levels", adminLevelController.renderLevelPage);
// router.post("/admin/levels", adminLevelController.actionNewLevel);
// router.post("/admin/levels/:id", adminLevelController.actionDeleteLevel);

// router.get("/admin/levels/:id/update", adminLevelController.renderUpdateLevel);
// router.post("/admin/levels/:id/update", adminLevelController.actionUpdateLevel);

// // Tags
// router.get("/admin/tags", adminTagController.renderTagsPage);


// module.exports = router;
