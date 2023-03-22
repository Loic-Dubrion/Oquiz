/* ========================================= 
*  ROUTER ADMIN
=========================================== */

// Importation des modules
const express = require('express');
const router = express.Router();

// Modules perso
const adminLevelController = require("../controllers/admin/adminLevelController");
const adminController = require("../controllers/admin/adminController");
const adminTagController = require("../controllers/admin/adminTagController");

// Module d'indentification
const authMiddleware = require("../services/authenfication");


/* ========================================= 
* DEFINITIONS DES ROUTES 
=========================================== */

// Admin
// On vient brancher le middleware de verif du role admin pour toutes les routes (toutes méthodes)
// router.use("/admin", authMiddleware.authAdmin);    // Bloque toutes les routes qui commence par admin
router.get("/admin", adminController.renderAdminPage);

// Gestion level
// Accueil gestion Level
router.get("/admin/levels", adminLevelController.renderLevelPage);
router.post("/admin/levels", adminLevelController.actionNewLevel);
router.post("/admin/levels/:id", adminLevelController.actionDeleteLevel);

// Modification levels
router.get("/admin/levels/:id/update", adminLevelController.renderUpdateLevel);
router.post("/admin/levels/:id/update", adminLevelController.actionUpdateLevel);

// Gestion Tags
// Accueil gestion Tag
router.get("/admin/tags", adminTagController.renderTagsPage);
router.post("/admin/tags", adminTagController.actionNewTag);
router.post("/admin/tags/:id", adminTagController.actionDeleteTag);

// Modification tag
router.get("/admin/tags/:id/update", adminTagController.renderUpdateTag);
router.post("/admin/tags/:id/update", adminTagController.actionUpdateTag);


/* ========================================= 
* EXPORT DU MODULE
=========================================== */

module.exports = router;
