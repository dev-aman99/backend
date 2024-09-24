const mongoose = require("mongoose"); 
const URL = process.env.MONGOBD_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(URL);
    console.log('connected');
  } catch (error) {
    console.error("Connection error");
    process.exit(0);
  }
};

module.exports = connectDb;