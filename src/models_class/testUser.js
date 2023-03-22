const CoreModel = require('./CoreModel');
const User = require('./user');
// const User = require('./user');

tableName = 'users';

async function testModels() {
  const tableName = 'user';
  // CREER UN UTILISATEUR
  // const newUser = new User({ firstname: 'Boby', lastname: 'Lapointe', email: 'test@example.com', password: 'mdp'});
  // await newUser.create();

  //TROUVER TOUS LES UTILISATEURS
  const users = await CoreModel.findAll(tableName);
  const result = users.map(elem => new User(elem));
  console.log('La liste des utilisateurs', result);

  //TROUVER UN UTILISATEUR
  const userById = await CoreModel.findById(tableName, 15);
  const resultById = new User(userById);
  console.log('Le détail d\'un utilisateur', resultById);

  // const user = await User.findByEmail('test@example.com');
  // console.log('Voici l\'utilisateur recherché', user);

  // user.lastname = "Emile";
  // await user.update();
  // console.log(user);

  // await user.delete();
  // console.log('l\'utilisateur', user, 'a bien été supprimer');


  

}

testModels();