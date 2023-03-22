// const dbClient = require('../dataMapper/dbClient_pg');
const dbClient = require('../dataMapper/dbClient_sequelize');

class CoreModel {
  // == Attributs d'instance == 
  id;
  created_at;
  updated_at;

  // ==== Attributs de classe ====
  static tableName;
  
  // == Constructeur
  constructor(obj) {
    this.id = obj.id;
    this.created_at = obj.created_at;
    this.updated_at = obj.updated_at;
  }

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

  static async findById(id) {
    const res = await db.query(`SELECT * FROM "${this.tableName}" WHERE id = $1`, [id]);
    const rawEntity = res.rows[0];

    if (rawEntity) { // Si le Level demandé existe, on le renvoie
      return new this(rawEntity); // rawEntity = { id, name } // new Level(rawEntity) = { id, name, update, delete, insert }
    } else {
      return null; // Sinon, on renvoie 'null' (typique Active Record)
    }
  }

  // ==== Méthode d'instance ====
  async insert() {
    console.log(this);
    console.log(Object.keys(this));
    console.log(Object.keys(this).map(attributeName => `"${attributeName}"`));
    console.log(Object.keys(this).join(", "));
    console.log(
      Object.keys(this).map(
        (element, index) => { return index; }
      )
    );
    console.log(Object.values(this));



    const attributeNameString = Object.keys(this).map(attributeName => `"${attributeName}"`).join(", "); // '"firstname", "lastname", "email", "password"'
    const templateString = Object.keys(this).map((_, index) => `$${index + 1}`); // '$1, $2, $3, $4';
    const attributeValues = Object.values(this); // [this.firstname, this.lastname, this.email, this.password];

    const query = `
      INSERT INTO "${this.constructor.tableName}"
        (${attributeNameString})
      VALUES 
        (${templateString})
      RETURNING
        "id"
    `;
    const res = await db.query(query, attributeValues);

    const id = res.rows[0].id;
    this.id = id;
  }

  async delete() {
    await db.query(`DELETE FROM "${this.constructor.tableName}" WHERE id = $1`, [this.id]);
    return true;
  }
}
 

module.exports = CoreModel;