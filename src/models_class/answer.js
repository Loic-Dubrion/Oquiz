const CoreModel = require("./CoreModel");

class Answer extends CoreModel {

  constructor(id, description) {

    super(obj);

    if (typeof obj.description !== "string") {
      throw new Error("Answer description must be a string");
    }
    this.description = obj.description;
  }
}

const a_22 = new Answer(22, "This is");
console.log(a_22);

module.exports = Answer;