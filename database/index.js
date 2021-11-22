const mongoose = require('mongoose')
const { DATABASE_URI } = require('../config')


exports.connectDb = async () => {
  const conn = await mongoose.connect(`${DATABASE_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};