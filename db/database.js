var mysql = require("mysql2");

class Database {
  #conexao;

  get conexao() {
    return this.#conexao;
  }
  set conexao(conexao) {
    this.#conexao = conexao;
  }

  constructor() {
    this.#conexao = mysql.createPool({
      host: "localhost",
      database: "ong_new",
      user: "root",
      password: "",
    });
  }

  AbreTransacao() {
    var cnn = this.#conexao;
    return new Promise(function(res, rej) {
        cnn.query("START TRANSACTION", function (error, results, fields) {
            if (error) 
                rej(error);
            else
                res(results);
        });
    })
  }

  Rollback() {
    var cnn = this.#conexao;
    return new Promise(function(res, rej) {
        cnn.query("ROLLBACK", function (error, results, fields) {
            if (error) 
                rej(error);
            else
                res(results);
        });
    })
  }
 
Commit() {
    var cnn = this.#conexao;
    return new Promise(function(res, rej) {
        cnn.query("COMMIT", function (error, results, fields) {
            if (error) 
                rej(error);
            else
                res(results);
        });
    })
  }

  ExecutaComando(sql, valores) {
    var cnn = this.#conexao;
    return new Promise(function (res, rej) {
      cnn.query(sql, valores, function (error, results, fields) {
        if (error) rej(error);
        else res(results);
      });
    });
  }

  ExecutaComandoNonQuery(sql, valores) {
    var cnn = this.#conexao;
    return new Promise(function (res, rej) {
      cnn.query(sql, valores, function (error, results, fields) {
        if (error) rej(error);
        else res(results.affectedRows > 0);
      });
    });
  }

  ExecutaComandoLastInserted(sql, valores) {
    var cnn = this.#conexao;
    return new Promise(function (res, rej) {
      cnn.query(sql, valores, function (error, results, fields) {
        if (error) rej(error);
        else res(results.insertId);
      });
    });
  }
}

module.exports = Database;
