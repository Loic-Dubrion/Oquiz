/**
 * ! Contexte : On repart de la calsse Vehicule
 * ? Imaginons qu'on veuille créer une classe Voiture ou encore Moto.
 * ? On ferait un c/c des props et méthodes de la classe Véhicule ?
 * 
 * * Solution : L'héritage ! ça permet de créer de nouvelles classes en se basant sur d'autres
 * * Les classes filles vont ainsi hériter des propriété et méthodes des classes mères !
 * 
 * ? Top ! Par contre on sait qu'une voiture aure 4 roues. On peut eviter de le spécifier à chaque fois ?
 * * Solution : On appel le constructor parent et on lui passe en 'dur' le nbOdWheels qui sera tjrs 4 pour une voiture
 * * => on utiliser le mot clé super()
 * 
 * ? Bah maintenant ça serait top de pouvoir modifier la méthode toString() pour la personnaliser un peu ! "Voiture, véhicule de 4 roues ..."
 * * Solution : La surcharge de méthode
 * 
 */

// On recup la classe mère Vehicule
const Vehicule = require('./exo_autonomie');


//! Etape 1 : On crée une classe fille
// On crée une nouvelle classe en sa basant sur Véhicule
class Voiture extends Vehicule {

  //! Etape 2 : constructor parent
  constructor(enginePower) {
    // Le mot clé super fait référence à la classe mère
    // Placée ici, elle permet d'appeler le constructor parent
    super(4, enginePower);
  }

  //! Etape 3 : Surcharge
  toString() {
    return 'Voiture => ' + super.toString(); // La méthode toString() parente
  }
}

// ! Etape 4 : Héritage en chaîne !!!
class Clio extends Voiture {
  constructor() {
    super(70);
  }

  toString() {
    return 'Clio => ' + super.toString();
  }
}

// Test étape 1
// const maCaisse = new Voiture(4, 90);
// console.log(maCaisse instanceof Voiture);
// console.log(maCaisse instanceof Vehicule);

// Tests étape 2 & 3
// const maCaisse = new Voiture(80);
// console.log(maCaisse.toString());

// Tests étape 4
const maClio = new Clio();
maClio.start();
console.log(maClio.toString());