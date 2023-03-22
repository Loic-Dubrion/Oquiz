/* ========================================= 
*  ROUTER USER
=========================================== */

// Importations des modules
const express = require('express');
const router = express.Router();

// Modules perso
const quizController = require("../controllers/quizController");
const tagController = require("../controllers/tagController.js");
const userController = require("../controllers/userController.js");

// Module d'authenfication
const authMiddleware = require("../services/authenfication");


/* ========================================= 
* DEFINITIONS DES ROUTES 
=========================================== */

// Quiz
// router.use("/quiz", authMiddleware.authUser);           //! Bloque si pas authentifier
router.get("/quiz/:id", quizController.renderQuizPage); // Affiche un quiz
router.post("/quiz/:id/result", quizController.renderQuizResults); // Affiche les résultats du quiz

// Tags
// router.use("/tags", authMiddleware.authUser);           //! Bloque si pas authentifier
router.get("/tags", tagController.renderTagsPage);      // Affiche la liste des quizz par thème

// User
router.get("/signup", userController.renderSignupPage); // Affiche la page d'inscription
router.post("/signup", userController.actionSignup);    // Traite l'inscription 

router.get("/login", userController.renderLoginPage);   // Affichage de la page de connexion
router.post("/login", userController.actionLogin);      // Traitement du formulaire de connexion

router.get("/profil", userController.renderProfilePage);// Affiche les infos utilisateurs

router.get("/logout", userController.actionLogout);     // Affichage de la page de connexion


/* ========================================= 
* EXPORT DU MODULE
=========================================== */

module.exports = router;