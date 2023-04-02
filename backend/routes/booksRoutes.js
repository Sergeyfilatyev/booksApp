const rolesMiddleware = require('../middlewares/rolesMiddleware');
const auth = require('../middlewares/auth');

// /api/v1/books
const booksController = require('../controllers/BooksController')

const express = require('express')
const booksRouter =express.Router()

//1 add book
booksRouter.post( '/books', auth, rolesMiddleware(["ADMIN"]), booksController.addBook )

//2 read all 
booksRouter.get('/books', auth, rolesMiddleware(["ADMIN", "MODERATOR", "USER"]), booksController.getAllBooks)

//3 read one
booksRouter.get('/books/:id', booksController.getOneBook )

//4 update book
booksRouter.put('/books/:id', booksController.updateBook)

//5 delete book
booksRouter.delete('/books/:id', booksController.removeBook)


module.exports = booksRouter