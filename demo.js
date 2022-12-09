const express = require("express");
const app = express();
const {Books} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;

// Getting all books from Books DB with endpoint "/books"
app.get("/books", async (req, res) => {
    const books = await Books.findAll();
    res.json(books);
})

//Getting specific book from Books DB based on Route Parameter ID specified in URL Path.
app.get("/books/:id", async (req, res) => {
    const book = await Books.findByPk(req.params.id);
    res.json({book});
})


// CRUD operations on Books in Database

// Add a book to the books database: 

// Update a book to the books database:

// Delete a book on books database:

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})