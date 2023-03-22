const CoreModel = require("./CoreModel");
const dbClient = require("../dataMapper/dbClient_pg");

class User extends CoreModel {
  #email;
  #password;

  constructor(obj) {
    super(obj); // On passe l'obj au CoreModel pour qu'il puisse initialiser l'id

    this.firstname = obj.firstname;
    this.lastname = obj.lastname;
    this.#email = obj.email;
    this.#password = obj.password;
  }

  // static async findAll() {
  //   try { 
  //     const result = await dbClient.query('SELECT * FROM "user"');
  //     const users = result.rows.map(elem => new User(elem));
  //     return users;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // static async findById(id) {
  //   try { 
  //     const result = await dbClient.query('SELECT * FROM "user" WHERE id = $1', [id]);
  //     const rawUser = result.rows[0];

  //     if (!rawUser) {return null;}

  //     console.log(rawUser);
  //     return new User(rawUser);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  static async findByEmail(email) {
    try { 
      const result = await dbClient.query('SELECT * FROM "user" WHERE email = $1', [email]);
      const rawUser = result.rows[0];

      if (!rawUser) {return null; }

      console.log(rawUser);
      return new User(rawUser);
    } catch (err) {
      console.error(err);
    }
  }

  async create() {
    try { 
      const result = await dbClient.query(
        `INSERT INTO "user" ( firstname, lastname, email, password )
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
         [this.firstname, this.lastname, this.#email, this.#password]);
      if (result.rowCount === 0) {
        throw new Error('Oups, insert failed');
      }
      this.id = result.rows[0].id;
      console.log(this.id, this);  
      return this;
    } catch (err) {
      console.error(err);
    }
  }

  async  update() {
    console.log('ok....');
    try { 
      const result = await dbClient.query(
        `UPDATE "user" SET firstname = $2, lastname = $3, email = $4, password = $5 
         WHERE id = $1`,
        [this.id, this.firstname, this.lastname, this.#email, this.#password]);
      if (result.rowCount === 0) {
        throw new Error('Oups, update failed');
      }
      return this;

    } catch (err) {
    console.log(err);
    }
  }

  async delete() {
    console.log('ok....');
    try { 
      const result = await dbClient.query(
        `DELETE FROM "user" WHERE id = $1`, [this.id]);
      if (result.rowCount === 0) {
        throw new Error('Oups, delete failed');
      }
      return this;
    } catch (err) {
      console.log(err);
    }
  }

}

// const Bob = new User ({ id: 5 , firstname : "Bob", lastname : "Marley", email : "boby@gmail.com", password : "mdp"});
// console.log(Bob.email);
// console.log(Bob.password);
// console.log(Bob);

module.exports = User;
