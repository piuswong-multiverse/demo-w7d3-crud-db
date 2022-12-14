const express = require("express");
const app = express();
const {Books} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;

// middleware to read in POST/PUT data...
app.use(express.json());
app.use(express.urlencoded({extended: true})); // extended:true lets you read in nested data

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
app.post('/books', async (req, res) => {
    // read in the data coming from the request
    // add the new book to our db
    await Books.create(req.body);
    // send out the new list of books
    res.send(await Books.findAll());
})

// Update a book to the books database:
app.put('/books/:id', async (req, res) => {
    // extract data from request
    const updatedBook = req.body;
    // update the database
    await Books.update(updatedBook, {
        where: {
            id: req.params.id
        }
    });
    // send out the list of all books
    res.send(await Books.findAll());
})

// Delete a book on books database:
app.delete('/books/:id', async (req, res) => {
    // await Books.destroy({
    //     where: {
    //         id: req.params.id
    //     }
    // });
    // Safer way to do it:
    const bookToDelete = await Books.findByPk(req.params.id); // no decrement needed in db
    await bookToDelete.destroy();
    res.send(await Books.findAll());
} )

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})