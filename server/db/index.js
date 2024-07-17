const mongoose = require("mongoose");
const env = require("dotenv");

env.config();
const dbconnection = async () => {
  mongoose.set('strictQuery', true);

  mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("Database connected"))
    .catch((err) => console.error(err));
};
module.exports = dbconnection;
