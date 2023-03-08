const env = require("../util/validateEnv");
const mongoose = require("mongoose");

async function connectDB() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(env.MONGO_URI);
    console.log("DB connectée ");
  } catch (err) {
    console.error(err);
    process.exit;
  }
}

module.exports = connectDB;
