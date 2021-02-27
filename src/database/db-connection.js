const mySql2 = require("mysql2");

class DBConnection {
  constructor() {
    this.db = mySql2.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
    });
  }

  checkConnection() {
    this.db.getConnection((err, connection) => {
      if (err) {
        console.log("Database error code: " + err.code);
        console.log("Database error message: " + err.message);
      }

      if (connection) {
        connection.release();
      }
      return;
    });
  }

  query = async (sql, values) => {
    return new Promise((resolve, reject) => {
      const callback = (error, result) => {
        if (error) {
          reject(error);
        }

        resolve(result);
      };

      this.db.execute(sql, values, callback);
    }).catch((error) => {
      console.log("DB Error: " + JSON.stringify(error));
    });
  };
}
