const jwt = require('jsonwebtoken');
const { db, DataTypes } = require('../db');

const Beat = db.define('beat', {
  name: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
});

Beat.addBeat = async ({ token, audioUrl }) => {
  const { id } = jwt.verify(token, process.env.JWT);
  if (id) {
    const response = Beat.create({
      userId: id,
      name: 'beat',
      url: audioUrl,
    });
    return response;
  }
  return null;
};

module.exports = Beat;
