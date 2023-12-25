const mongoose = require("mongoose");
// Batabase URL
const dbConection = () => {
    mongoose
  .connect(process.env.DB_URL)
  .then((conn) => {
    console.log(`DataBase Connected : ${conn.connection.host}`);
  })
  // .catch((error) => {
  //   console.log("Error with connecting with the DB", error);
  // });
}

module.exports = dbConection;