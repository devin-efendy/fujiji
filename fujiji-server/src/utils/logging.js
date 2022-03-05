function logDebug(title, message) {
  if (process.env.NODE_ENV !== 'test') {
    console.log(title);
    console.log(message);
  }
}

module.exports = { logDebug };
