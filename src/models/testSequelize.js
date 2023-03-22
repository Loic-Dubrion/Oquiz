// On importe tous nos modèles
const { Answer, Level, Question, Quiz, Tag, User } = require('./index.js'); // on require l'export du fichier index.js

async function testTag() {
  // Get All
  const tags = await Tag.findAll(); // Permet de log les données au format brute (de base sous forme d'objet)
  console.log(tags);

  // Get One
  const tag = await Tag.findByPk(9,  {raw: true});  // {raw: true} n'est pas necessaire si déclaré dans le database.js
  console.log(tag);

  // Get One
  const otherTag = await Tag.findOne({
    raw: true,
    where: {
      name: "Littérature"
    }
  });
  console.log(otherTag);

  // Insert
  const insertedTag = await Tag.create({ name: "Sequelize" });
  console.log(`Le nouveau Tag à l'ID : ${insertedTag.id}. Il a été génére automatiquement par la DB`);

  // Update
  const updatedTag = await Tag.update({ name: "Sequelize the best" }, {
    where: {
      name: "Sequelize",
    }
  });
  console.log(updatedTag); // Retourne le nombre de ligne affectées
  
  // Delete
  const deletedTag = await Tag.destroy({
    where: {
      name: "Sequelize the best",
    }
  });
  console.log(deletedTag);
}

async function AllAnswers() {
    const answers = await Answer.findAll(); // Permet de log les données au format brute (de base sous forme d'objet)
    console.log(answers);
}

async function testUsers() {
  // Get All
  const users = await User.findAll(); // Permet de log les données au format brute (de base sous forme d'objet)
  console.log(users);
}

async function oneId() {

  const answer = await Answer.findByPk(3);  
  console.log(answer);
}

// Post.findAll({
//   where: {
//     authorId: 12,
//     status: 'active'
//   }
// });
// SELECT * FROM post WHERE authorId = 12 AND status = 'active';

async function testQuiz() {
  // GET ALL
  const quizzes = await Quiz.findAll();
  console.log( JSON.stringify(quizzes, null, 2) );   //! forme JSON indentée de 2 espaces JSON.stringify(value, replacer, space)
}

const activeRecord = {

  async findById(model, id) {
    const result = await model.findByPk(id);  
    console.log(JSON.stringify(result, null, 2));
  },

  async quizByTitle(model, title) {
    const result = await model.findOne({ 
      where: {
        title: title
      }
    });
    console.log( JSON.stringify(result, null, 2) )
  },

  async findAll(model) {
    const result = await model.findAll();
    console.log(JSON.stringify(result, null, 2));
  },

  async questionAndLevel(id) {                    
    const result = await Question.findByPk(id, {  // recherche d'une question par son id
      raw: true,                                  // obtenir le resultat sous forme de tableau
      include: {                                  // Faire une jointure
        model: Level,                             // Avec la table level
        attributes: ['name']                      // uniquement pour l'attribut name
      }
    });
    console.log(JSON.stringify(result, null, 2));
  },

  async addLevel() {
    const insertedLevel = await Level.create({ name: "très difficile" });
    console.log(`Le nouveau Level : ${insertedLevel.name} a été généré automatiquement par la DB`);
  },

  async deletedLevel() {
    const deletedLevel = await Level.destroy({
      where: {
        name: "Sequelize",
      }
    })
  },

  async testAssoc() {
    const result = await Quiz.findByPk(16, {
      include: "user",
    });
    console.log(JSON.stringify(result, null, 2)); 
  },

}

//! JOINTURE On veut la question 16 avec les infos de son auteur
async function testAssoc() {
  // Recup un quizz avec son auteur
  const quizWithAuthor = await Quiz.findByPk(16, {
    include: "author",
  });
  // console.log( JSON.stringify(quizWithAuthor, null, 2) );
  // console.log( JSON.stringify(quizWithAuthor.author, null, 2) );
    // Recup les quizzes crée par l'auteur à l'id 3
    const authorWithQuizzes = await User.findByPk(3, { 
      include: "quizzes"
    });
  // console.log( JSON.stringify(authorWithQuizzes, null, 2) );
  const allQuizWithQuestions = await Quiz.findAll({
    include: "questions",
  });
  // console.log(JSON.stringify(allQuizWithQuestions, null, 2));
  const questionWithQuiz = await Question.findByPk(117, {
    include: "quiz",
  });
  // console.log(JSON.stringify(questionWithQuiz, null, 2));
  const questionWithLevel = await Question.findByPk(117, {
    include: "level"
  });
  // console.log( JSON.stringify(questionWithQuiz, null, 2) );
  const allQuestionsByLevel = await Level.findByPk(2, {
    include: "questions"
  })
  console.log(JSON.stringify(allQuestionsByLevel, null, 2));
}

//! Associataions transitives (Quiz -> Question -> Level)
async function quizWithLevel() {
  const result = await Quiz.findByPk(5, {
    include: {                   // A partir de quiz 
      association: "questions",  // On veut récupérer les questions
      include: "level",          // Puis le level de ces questions
    }
  })
  console.log(JSON.stringify(result, null, 2));
}

async function questionLevelQuizAnswers() {
  const question = await Question.findByPk(17, {
    include: ["level", "quiz", "answers"]
  });
  // console.log(JSON.stringify(question, null, 2));

  const questionRep = await Question.findByPk(17, {
    include: ["level", "quiz", "answers", "good_answer"],
  });
  console.log( JSON.stringify(questionRep, null, 2) );

  const quizWithTags = await Quiz.findByPk(17, {
    include: "tags"
  });
  console.log( JSON.stringify(quizWithTags, null, 2) );

  const tagWithQuizzes = await Tag.findByPk(3, {
    include: "quizzes"
  });
  console.log( JSON.stringify(tagWithQuizzes, null, 2) );

    //! Bonus : Projection et ordre
    const users = await User.findAll({
      order: [['created_at', 'DESC']], // On trie la réponse par date de création décroisante
      attributes: { exclude: ["password", "updated_at"] }, // On exclut ces champs de la réponse.
      include: {
        association: "quizzes",
        attributes: ["title"] // On ne garde que ce champs dans la réponse
      }
    });
    console.log( JSON.stringify(users, null, 2) );
}

// activeRecord.findById(Question, 5);
// activeRecord.findAll(Quiz);
// activeRecord.quizByTitle(Quiz, "Linux - III");
// activeRecord.questionAndLevel(5);
// addLevel();
// deletedLevel();
// activeRecord.testAssoc();
// testAssoc();
// quizWithLevel();
// questionLevelQuizAnswers();

async function test() {
  const result = await Quiz.findByPk(1, {
    include: {                   
      association: "questions",  
      include: ["level", "answers"],        
    },
  })
  console.log(JSON.stringify(result, null, 2));
}
// test();

async function test2() {
  const result = await Quiz.findByPk(1, {
    include: "tags",
  })
  console.log(JSON.stringify(result, null, 2));
}
// test2();

async function renderQuizPage() {
  const id = 1;
  console.log(id);

  // Récupération des informations du quiz (tags, questions, niveaux et réponses)
  const quiz = await Quiz.findByPk(id, {
    include: [
      "tags",
      {
        association: "questions",
        include: ["level", "answers"],
      },
    ],
  });

  console.log(JSON.stringify(quiz, null, 2));
}
// renderQuizPage();

 async function existingLevel() {
  const level = await Level.findAll()
  console.log(level);
 }
existingLevel();