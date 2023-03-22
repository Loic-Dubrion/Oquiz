const Tag = require('./tag');

async function testModels() {
  // === Get All Tags
  // On utilise une méthode statique
  // Pas besoin de créer un nouvel objet pour l'utiliser !
  const tags = await Tag.findAll();
  console.log(tags);

  // === Get One Tag
  const tag = await Tag.findById(5);
  console.log(tag);

  // === Create Tag
  const newTag = new Tag({ name: "Dev web" }); // Création d'un nouvel objet Tag
  await newTag.create(); // Save en DB (génère l'id et le met dans l'objet newTag)

  // === Delete Tag
  // On crée un tag pour préparer le test de suppression
  const newtagToDelete = new Tag({ name: "Dev Web2" });
  const createTagToDelete = await newtagToDelete.create();
  console.log(createTagToDelete);

  // Je le supprime
  const isDeleted = await createTagToDelete.delete(); // Supprime le tag de la DB
  console.log(isDeleted);

  // === Update Tag
  tag.name = "Starship";
  await tag.update();
  console.log(tag);
}

testModels();
