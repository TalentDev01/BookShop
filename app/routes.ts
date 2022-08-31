module.exports = (app:any) => {
    const books = require('./controller.ts');

    // Create a new Book
    app.post('/addBook', books.create);

    // Retrieve all Books
    app.get('/getBooks', books.findAll);

    // Retrieve a single Book with id
    app.get('/getBook/:id', books.findOne);

    // Update a Book with id
    app.put('/updateBook/:id', books.updateAll);

    // Update a Book with id
    app.patch('/editBook/:id', books.updateOne);

    // Delete a Book with id
    app.delete('/deleteBook/:id', books.delete);
}