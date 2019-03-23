const mongoose = require('mongoose');

connectOptions = {
    useNewUrlParser: true,
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE
  };

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, connectOptions, (err) => {
    if (err) console.log('Error', err);
    console.log('Now connected to a MongoDB');
});

module.exports = { mongoose };