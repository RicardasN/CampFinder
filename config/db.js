const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      poolSize: 10
    });
    console.log('MongoDB Connected ...  :)');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

const closeDB = async () => {
  return mongoose.disconnect();
};

module.exports = { connectDB, closeDB };
