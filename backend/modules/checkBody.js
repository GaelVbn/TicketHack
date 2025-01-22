function checkBody(body, keys) {
  return keys.every(key => Object.keys(body).includes(key));
}

module.exports = { checkBody };
