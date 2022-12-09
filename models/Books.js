const Sequelize = require("sequelize");
const {sequelize} = require("../db");

const Books = sequelize.define("books", {
    name: Sequelize.STRING,
    author: Sequelize.STRING,
    genre: Sequelize.STRING
})

module.exports = {Books};