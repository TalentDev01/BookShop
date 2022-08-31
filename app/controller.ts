const axios = require('axios')
// Create and Save a new Book
var respObj;
var upFlg: any;
exports.create = (req: any, res: any) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Book title can not be empty"
        });
    }
    //Find Title Present
    axios.get('http://localhost:3000/books?title=' + req.body.title)
        .then((book: any) => {
            if (Object.keys(book.data).length) {
                console.log("res1", book.data);
                return res.status(400).send({
                    message: "Not allowed Duplicate Book title"
                });
            } else {
                // Save Book in the database
                axios.post('http://localhost:3000/books', req.body)
                    .then((data: any) => {
                        // res.setHeader("Content-Type", "text/html")
                        respObj = {
                            result: data.data,
                            message: "Success",
                        }
                        // res.send(respObj);
                        res.json(respObj);
                    }).catch((err: any) => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Book."
                        });
                    });
            }
        }).catch((err: any) => {
            if (err) {
                // Save Book in the database
                axios.post('http://localhost:3000/books', req.body)
                    .then((data: any) => {
                        // res.setHeader("Content-Type", "text/html")
                        respObj = {
                            result: data.data,
                            message: "Success",
                        }
                        // res.send(respObj);
                        res.json(respObj);
                    }).catch((err: any) => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Book."
                        });
                    });
            }
        });
};

// Retrieve and return all books from the database.
exports.findAll = (req: any, res: any) => {
    axios.get('http://localhost:3000/books')
        .then((books: any) => {
            // res.setHeader("Content-Type", "text/json")
            respObj = {
                result: books.data,
                message: "Success",
            }
            res.json(respObj);
        }).catch((err: any) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving books."
            });
        });
};

// Find a single book with a id
exports.findOne = (req: any, res: any) => {
    axios.get('http://localhost:3000/books/' + req.params.id)
        .then((book: any) => {
            if (!book) {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.id
                });
            }
            respObj = {
                result: book.data,
                message: "Success",
            }
            // res.send(respObj);
            res.json(respObj);
        }).catch((err: any) => {
            if (err) {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving book with id " + req.params.id
            });
        });
};

// Update a book identified by the id in the request
exports.updateAll = (req: any, res: any) => {
    // Validate Request
    if (!req.body.title || !req.body.author) {
        return res.status(400).send({
            message: "Fill all required fields."
        });
    }
    // Find book and update it with the request body
    axios.put('http://localhost:3000/books/' + req.params.id, req.body)
        .then((book: any) => {
            if (!book) {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.id
                });
            }
            respObj = {
                result: book.data,
                message: "Success",
            }
            res.json(respObj);
        }).catch((err: any) => {
            if (err) {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating book with id " + req.params.id
            });
        });
};

// Update a book identified by the id in the request
exports.updateOne = (req: any, res: any) => {
    if (!Object.keys(req.body).length) {
        return res.status(400).send({
            message: "Fields cannot be empty."
        });
    }
    // Find book and update it with the request body
    axios.patch('http://localhost:3000/books/' + req.params.id, req.body)
        .then((book: any) => {
            if (!book) {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.id
                });
            }
            respObj = {
                result: book.data,
                message: "Success",
            }
            res.json(respObj);
        }).catch((err: any) => {
            if (err) {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating book with id " + req.params.id
            });
        });
};

// Delete a book with the specified id in the request
exports.delete = (req: any, res: any) => {
    axios.delete('http://localhost:3000/books/' + req.params.id)
        .then((book: any) => {
            if (!book) {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.id
                });
            }
            res.json({ message: "Book deleted successfully!" });
        }).catch((err: any) => {
            if (err) {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete book with id " + req.params.id
            });
        });
};
