/**
 * ! Objectif 1 : Créer une classe Vehicule
 * * props : `nbOfWheels` (number), `enginePower` (number), `isStarted` (boolean)
 * * méthodes :
 * * - constructor(nbWheels, enginePower) // isStarted est 'false' par défaut
 * * - start() // Passe isStarted à true
 * * - stop() // Passe isStarted à false
 * * - toString() // RETOURNE "Véhicule à X roues, de puissance Y, {est démarré | n'est pas démarré}."
 * * Tester en créant plusieurs véhicules (clio, ferrari, trotinette, etc...)
 * 
 * ! Objectif 2 : Private, getter & setter
 * * - Faire en sorte de pouvoir changer isStarted uniquement avec les méthodes start() et stop() (donc pas de l'exterieur)
 * * - Faire en sorte de pouvoir modifier enginePower de l'exterieur mais en s'assurant qu'on utilise bien un Number POSITIF pour ça
 * * - BONUS : Faire en sorte d'avoir un Number POSITIF pour enginePower lors de la création d'une nouvel objet
 */

class Vehicule {
  nbOfWheels;
  #enginePower;
  #isStarted;

  constructor(nbOfWheels, enginePower) {
    this.nbOfWheels = nbOfWheels;

    // On peut faire de la validation directement dans le constructor
    if (typeof enginePower === 'number' && enginePower > 0) {
      this.#enginePower = enginePower;
    } else {
      this.#enginePower = 0;
    }

    this.#isStarted = false;
  }

  // Setter
  set enginePower(newEnginePower) {
    if (typeof newEnginePower === 'number' && newEnginePower > 0) {
      this.#enginePower = newEnginePower;
    }
  }

  start() {
    this.#isStarted = true;
  }

  stop() {
    this.#isStarted = false;
  }

  toString() {
    return `Véhicule à ${this.nbOfWheels} roues, de puissance ${this.#enginePower}, ${this.#isStarted ? 'est allumé' : 'n\'est pas allumé'}.`;
  }
}


const clio = new Vehicule(4, 90);
// console.log(clio.toString());
// clio.start();
// console.log(clio.toString());
// clio.stop();
// console.log(clio.toString());

// const ferrari = new Vehicule(4, 250);
// console.log(ferrari.toString());

// const trotinette = new Vehicule(2, 20);
// console.log(trotinette.toString());

// console.log(clio.isStarted); // Undefined car private
// clio.isStarted = true; // Impossible car private sans setter
// console.log(clio.toString()); // Pas allumé
// clio.start();
// console.log(clio.toString()); // ALlumé car on passe par la méthode start()

// console.log(clio.toString());
// clio.enginePower = "52"; // Impossible car pas un Number
// console.log(clio.toString()); // puissance : 90
// clio.enginePower = -52; // Impossible car pas négatif
// console.log(clio.toString()); // puissance : 90
// clio.enginePower = 66; // ça passe
// console.log(clio.toString()); // puissance : 66





module.exports = Vehicule;
