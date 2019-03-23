const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI,  {
  useNewUrlParser: true,
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
}, (error) => {
  if (error) console.log(error.message);
  console.log('Connected to MongoDB...');
});

module.exports = { mongoose };