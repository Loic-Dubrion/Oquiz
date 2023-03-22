// On importe tous nos modèles
const Tag = require('./tag');
const User = require('./user');
const Quiz = require('./quiz');
const Question = require('./question');
const Level = require('./level');
const Answer = require('./answer');


// Ensuite on viendra faire nos associations
// One-to-One : hasOne + belongsTo
// One-to-Many : hasMany + belongsTo
// Many-to-Many : belongsToMany (through) + belongsToMany (though)

//! User N <-> 1 Quiz
User.hasMany(Quiz, { // Un utilisateur peut créer plusieurs Quiz
  foreignKey: "user_id",
  as: "quizzes"
});
Quiz.belongsTo(User, { // Un quiz peut être crée par un seul utilisateur
  foreignKey: "user_id",
  as: "author"
});

//! Quiz N <-> 1 Question
Quiz.hasMany(Question, { // Un quiz peut être composé de plusieurs questions
  foreignKey: "quiz_id",
  as: "questions"
});
Question.belongsTo(Quiz, { // Une question peut composer un seul quiz
  foreignKey: "quiz_id",
  as: "quiz"
});

//! Question 1 <-> N Level
Level.hasMany(Question, { // Un level peut définir plusieurs questions
  foreignKey: "level_id",
  as: "questions"
});
Question.belongsTo(Level, { // Une question ne peut avoir qu'un level
  foreignKey: "level_id",
  as: "level"
});

//! Question N <-> 1 Answer
Question.hasMany(Answer, { // une question peut avoir plusieurs réponses
  foreignKey: "question_id",
  as: "propositions"
});
Answer.belongsTo(Question, { //une réponse est possédée par une seule question
  foreignKey: "question_id",
  as: "question"
});

//! Question 1 <-> 1 Answer : La bonne réponse
Question.belongsTo(Answer, { // Une question n'a qu'une seule bonne
  foreignKey: "answer_id",
  as: "good_answer"
});

//! Quiz N <-> N Tag
Quiz.belongsToMany(Tag, {   // Quiz peut avoir plusieurs Tag
  through: 'quiz_has_tag',  // Table de liaison
  as: "tags",               // l'alias de Tag pour le include
  foreignKey: "quiz_id",    // Référence à Quiz dans table de liaison
  otherKey: "tag_id"        // Référence à Tag dans table de liaison
});
Tag.belongsToMany(Quiz, {   // Tag peut definir plusieurs Quiz
  through: 'quiz_has_tag',
  as: "quizzes",
  foreignKey: "tag_id",
  otherKey: "quiz_id"
}); 

// Enfin on exporte le tout
module.exports = {
  Tag,
  User,
  Quiz,
  Question,
  Level,
  Answer,
}