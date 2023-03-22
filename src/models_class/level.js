const CoreModel = require("./CoreModel");

    class Level extends CoreModel {

      constructor(obj) {

        super(obj); // On passe l'obj au CoreModel pour qu'il puisse initialiser l'id

        if (typeof obj.name !== 'string') {
          throw new Error("Level name must be a string");
        }
        this.name = obj.name;

      }
    }

module.exports = Level;