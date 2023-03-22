// Charger les variables d'environnement
const dotenv = require("dotenv");
dotenv.config();

// Importer les dependances
const express = require("express");
const session = require("express-session");

const router = require("./src/routers");
const sessionUser = require("./src/services/sessionUser");
const errorHandler = require("./src/services/errorHandler");  // Gestion des erreurs

// Création du serveur express
const app = express();

// Configurer le view engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

// On expose le contenu du dossier public au reste du monde
app.use(express.static("public")); // Ca revient à déclarer une route par fichier en quelque sorte


// Setup body parser
app.use(express.urlencoded({ extended: false }));


// Setup des sessions
app.use(session({
  secret: 'UneChaineDeCharAleatoire', // le "secret" qui sert à générer les identifiants de sessions uniques.
  resave: true, // sauvegarde automatique de la session à la fin de la requête
  saveUninitialized: true, // créer une session pour l'internaute dans tous les cas, mais si elle est vide.
  cookie: {
      // des options pour le cookie qui contient l'identifiant de session comme sa durée de vie par exemple.
  }
}));

// Hop, le petit middleware magique (verif à chaque res si user connecté)
app.use(sessionUser);

// On plug le router
app.use(router);
app.use(errorHandler);                            // Fin de la route - Gestion des erreurs


// Lancer l'application
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
