/**
 * ! Contexte : On se fait une classe User avec des propriétés id, email, password
 * ! On construit un objet user en  admettant que les données nous viennt d'un DB
 * 
 * ? Problematique 1 : On arrive à acceder au mdp à l'exterieur de l'objet. On arrive même à chager sa valeur ?
 * * Solution : Rendre la prorpiété privée
 * * => On encapsule la donnée ce qui la rend inaccessible depuis l'exterieur (ni lecture, ni ecriture)
 * ? Mais a quoi ça sert d'avoir la prop password ?
 * * => On peut en avoir besoin dans de la logique interne comme une méthode par exemple (checkpassword ?)
 * 
 * ? Problèmatique 2 : On peut accèder à l'id en lecture (ça c'est ok), mais aussi en écriture ??!
 * * => On rend private notre id ?
 * ? Hm, on peut plus lire du tout l'id par contre
 * * => On va faire en sorte de rende la lecture possible mais pas l'écriture
 * 
 * ? Problèmatique 3 : On peut modifier l'email à l'exterieur de l'objet, c'est pas génant
 * ? Par contre on peut y mettre n'importe quel type de données, alors qu'on attend une string
 * * => On va passer en private et on va mettre en place une méthode mutateur : un setter
 */

class User {
  #id; // Prop en lecture seule (car présence d'un getter)
  #email;
  #password; // Cette prop est private (non dispo en lecture et écriture)

  constructor(id, email, password) {
    // On n'oublie pas d'ajuster notre code pour utiliser les privates
    this.#id = id;
    this.#email = email;
    this.#password = password;
  }

  // Méthode d'accès à la valeur privée
  // => Getter
  get id() {
    return this.#id;
  }

  get email() {
    return this.#email;
  }

  // Méthode mutateur (pour modifier la valeur d'une private)
  // Utile si on a besoin de faire de la validation de type
  // => Setter
  set email(newEmail) {
    // En vrai il faudrait s'assurer que c'est un bon email (avec @ tousa tousa)
    if(typeof newEmail === 'string') {
      this.#email = newEmail;
    }
  }

  checkPassword() {
    // La prop #password est privée : non accessible à l'exterieur mais dispo à l'interieur
    if (this.#password === "I4mT0t0!") {
      return true;
    } else {
      return false;
    }
  }
}


// Admettons qu'on recup les valeurs depuis une DB pour construire l'objet user
const toto = new User(65, "toto@toto.com", "I4mT0t0!");
// console.log(toto.password); // Undefined car private
// toto.password = "HACKED !!"; // On crée une prop password sur l'objet mais qui n'est pas la prop private #password
// console.log(toto.password); // Hacked !!
// console.log(toto.checkPassword()); // true car la VRAIE prop private #password n'est pas changée


// console.log(toto.id); // On peut lire notre #id car on a un getter
// toto.id = 666; // Ne fonctionne pas car #id est en read only


console.log(toto.email);
toto.email = "coucou@coucou.com";
toto.email = true; // Impossible car passe pas la validation de type du setter
console.log(toto.email);