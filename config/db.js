//Mongo db connection

const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

connectDB = async () => {
  try {
    //use await since mongoose.connect returns a promise
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.log(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
