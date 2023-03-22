const CoreModel = require("./CoreModel");


class Quizz extends CoreModel {
  
  constructor(obj) {
    super(obj);

    if (typeof obj.title !== "string") {
      throw new Error("Quiz title must be a string");
    }
    this.title = obj.title;

    if (typeof obj.description !== "string") {
      throw new Error("Quiz description must be a string");
    }
    this.description = obj.description;

    }
}

module.exports = Quizz;