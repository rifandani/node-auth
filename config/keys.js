dbPassword =
  'mongodb+srv://rifandani:' +
  encodeURIComponent('rifandani') +
  '@cluster0-rqaap.mongodb.net/passport?retryWrites=true';

module.exports = {
  mongoURI: dbPassword,
};
