/* ========================================= 
*  POINT D'ENTREE ROUTER
=========================================== */

// Importations des modules
const express = require('express');
const routers = express.Router();

const accueil = require('./accueil');
const user = require('./user');
const admin = require('./admin');


/* ========================================= 
* DEFINITIONS DES ROUTES 
=========================================== */

routers.use(admin);

routers.use(user);

routers.use(accueil);


/* ========================================= 
* EXPORT DU MODULE
=========================================== */

module.exports = routers;