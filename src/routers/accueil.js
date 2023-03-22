/* ========================================= 
*  ROUTER ACCUEIL
=========================================== */

// Importations des modules
const express = require('express');
const router = express.Router();

const mainController = require("../controllers/mainController");


/* ========================================= 
* DEFINITIONS DES ROUTES 
=========================================== */

// home
router.get("/", mainController.renderHomePage);


/* ========================================= 
* EXPORT DU MODULE
=========================================== */

module.exports = router;