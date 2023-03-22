/* eslint-disable no-unused-vars */
const Level = require("./level");
const User = require("./user");

// main();

async function main() {
  // await testLevel();
  // await testUser();
  // await testCoreModel();
  await testLevel2();
}

async function testLevel() {
  // ==== Création ====
  const hardCoreLevel = new Level({
    name: "HarCore"
  });
  hardCoreLevel.direBonjour();

  // ===== Insertion ====
  await hardCoreLevel.insert();
  console.log(hardCoreLevel.id);

  // ==== Fetch all ====
  const allLevels = await Level.findAll();
  console.log(allLevels);

  allLevels.forEach(level => {
    level.direBonjour();
  });


  // ===== FindById ====
  const secondLevel = await Level.findById(2);
  console.log(secondLevel.name); // Confirmé

  const unexistingLevel = await Level.findById(1300);
  console.log(unexistingLevel); // null


  // ==== Delete ===
  const extreme = new Level({ name: "Extreme"});
  await extreme.insert();
  await extreme.delete();


  const myLevel = new Level({ name: "Legendaire" });
  await myLevel.insert();

  myLevel.name = "Claqué au sol";
  await myLevel.update();


  // const tresdur = new Level({ name: "très difficile" });
  // tresdur.insert();
  // tresdur.update();

  // const myLevel = await Level.findById(42);
  // myLevel.name = "Autre chose";
  // myLevel.save();
}

async function testUser() {
  const george = new User({
    firstname: "George",
    lastname: "Abitbol",
    email: "george@class.io",
    password: "LhommeLePlusCl4ssDuMonde"
  });

  await george.insert();
  console.log(george.id);

  george.email = "george.abitbol@gmail.com";
  await george.update(); // On persiste le changement dans la base

  await george.delete();

  // Version alternative avec une méthode static
  // await User.delete(george.id);

  // ======================

  const users = await User.findAll();
  console.log(users);

  console.log(users[0].fullname);

  const firstUser = await User.findById(1);
  console.log(firstUser.email);

  const chuck = await User.findByEmail("chuck@oclock.io");
  console.log(chuck.firstname);
}

async function testCoreModel() {
  const users = await User.findAll();
  console.log(users);

  const levels = await Level.findAll();
  console.log(levels);

  await users[4].delete();
}


async function testLevel2() {

  const level = new Level({ name: "Easy peasy"});
  level.direBonjour();


  const levels = await Level.findAll();
  console.log(levels);
  levels[0].direBonjour();

  
}

testLevel2();