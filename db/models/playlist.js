const Sequelize = require('sequelize')
const db = require('../db')
const User = require("./user");

const Playlist = db.define("playlist", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  });
  
  module.exports = Playlist;