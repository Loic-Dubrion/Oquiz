const db = require("../../database");

class CoreModel {
  // ==== Attributs d'instance ====
  #id;

  // ==== Attributs de classe ====
  static tableName;

  // ==== Constructeur ====
  constructor() {}

  // ==== Getter ====
  get id() {
    return this.#id;
  }

  // ==== Setter ====
  set id(value) {
    this.#id = value;
  }

  // ==== Méthode de classe ====
  static async findAll() {
    const query = `SELECT * FROM "${this.tableName}"`;
    const res = await db.query(query);
    const rawEntities = res.rows;

    return rawEntities.map(rawEntity => new this(rawEntity)); // this fait référence au constructeur de la classe
  }

  // ==== Méthode d'instance ====
  async delete() {
    await db.query(`DELETE FROM "${this.constructor.tableName}" WHERE id = $1`, [this.id]);
    return true;
  }
}

module.exports = CoreModel;
