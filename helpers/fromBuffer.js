module.exports = function fromBuffer(buffer) {
  const string = buffer.toString();
  return JSON.parse(string);
};
