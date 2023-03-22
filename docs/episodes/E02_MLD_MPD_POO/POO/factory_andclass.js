/**
 * ! Contexte : On veut modéliser des personnages via des objets
 * ? Problématique : OK, mais si on veut se faire plusieurs perso ? On copie/colle ?
 * => Mouaif, pas ouf, pas DRY
 * 
 * * Solution 1: On pourrait se faire une fonction pour créer des objets !
 * * C'est ce qu'on appel une fonction Factory (usine a objet)
 * 
 * * Solution 2: Il existe une autre solution plus classe et plius flexible
 * * => Les classes
 */

const harry = {
  firstname: "Harry",
  lastname: "Potter",
  age: 29,

  sayHi() {
    console.log(`Salut je suis ${harry.firstname} ${harry.lastname} et j'ai ${harry.age} ans !`);
  },
};
const drago = {
  firstname: "Drago",
  lastname: "Malfoy",
  age: 30,

  sayHi() {
    console.log(`Salut je suis ${drago.firstname} ${drago.lastname} et j'ai ${drago.age} ans !`);
  },
};

// ==================================
// == Solution 1 : Fonction Fatory ==
// ==================================
function characterFactory(firstname, lastname, age) {
  // En vrai, on en profitera pour faire de la validation de type ici
  return {
    firstname: firstname,
    lastname: lastname,
    age: age,
  
    sayHi() {
      console.log(`Salut je suis ${firstname} ${lastname} et j'ai ${age} ans !`);
    },
  }
}

const hermione = characterFactory("Hermione", "Granger", 29);
const ron = characterFactory("Ron", "Weasley", 31);

// hermione.sayHi();
// ron.sayHi();


// ==============================
// == Solution 2 : Les classes ==
// ==============================
// On définit le modèle à partir duquel nos futurs objets personnages vont être crées
class Character {
  firstname;
  lastname;
  age;

  //! Une fonction spéciale
  // Le constructor est executer lors de la création d'un nouvel objet
  // Cette fonction sert à initialiser les propriétés du nouvel objet avec les bonnes valeurs
  constructor(firstname, lastname, age) {
    // Le mot clé this permet de faire référence au nouvel objet crée
    // En vrai, on en profitera pour faire de la validation de type ici
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
  }

  sayHi() {
    console.log(`Salut je suis ${this.firstname} ${this.lastname} et j'ai ${this.age} ans !`);
  }
}

// On crée de nouveaux objet personnages en utilisant la classe
const luna = new Character("Luna", "Lovegood", 28);
const nevil = new Character("Nevil", "Londubat", 32);

luna.sayHi();
nevil.sayHi();
