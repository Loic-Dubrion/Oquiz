const { Quiz, Question } = require('../models');

const quizController = {

  async renderQuizPage(req, res, next) {
    try {
      const quizId = Number(req.params.id);
      const quiz = await Quiz.findByPk(quizId, {  // A partir d'un quizz
        include: [                                
          "author",                               // L'auteur
          "tags",                                 // Les thèmes
          {                                       // Et les questions
            association: "questions",             // A partir de question
            include: [                            // On inclu 
              "level",                            // Le niveau
              "propositions"                      // Les réponses
            ],   
          } 
        ]
      });
      // console.log(JSON.stringify(quiz, null, 2));
      // Si le quiz n'existe pas en DB : 404
      if (!quiz) { 
        return res.status(404);
      }

      res.render('quiz', {quiz} )
    } catch (err) {
      res.status(500);
    }
},

  async renderQuizResults(req, res, next) {
    const quizId = parseInt(req.params.id);
    const body = req.body;

    console.log(quizId);
    console.log(body);


    // Récupérer le quiz de la BDD, avec ses bonnes réponses

    const quiz = await Quiz.findByPk(quizId, {
      attributes: ["id"],
      include: {
        association: "questions",
        attributes: ["id", "answer_id"],
        // include: {
        //   association: "good_answer",
        //   attributes: "id"
        // }
      }
    });

    console.log(quiz.toJSON());

    let score = 0;

    for (const question of quiz.questions) {
      const goodAnswerId = question.answer_id;
      const userPropositionId = parseInt(body[question.id]);
      if (goodAnswerId === userPropositionId) {
        score++;
      }
    }

    res.render("quiz-solution", { score, maxScore: quiz.questions.length });
  },

}

module.exports = quizController;