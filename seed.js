const {Books} = require("./models/Books.js")
const seedData = require("./seedData");
const {sequelize} = require("./db")

const syncSeed = async () => {
    await sequelize.sync({force: true});
    await Books.bulkCreate(seedData)
}

syncSeed()

