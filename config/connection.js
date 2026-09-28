const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected successfully!');
});

module.exports = mongoose.connection;
