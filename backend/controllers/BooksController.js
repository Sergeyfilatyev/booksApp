const asyncHandler = require("express-async-handler");
const bookModel = require("../models/bookModel");

class BooksController {
    addBook = asyncHandler(async (req, res) => {
        const { title, price } = req.body;
        if (!title || !price) {
            // res.status(400).json({
            //     code: 400,
            //     message:"Provide all required fields !"}
            // )

            res.status(400);
            throw new Error("Provide all required fields !");
        }
        const book = await bookModel.create({ ...req.body });
        res.status(201).json({
            code: 201,
            message: "Success Max good!",
            data: book,
        });
    });
    getAllBooks = asyncHandler (async (req, res) => {
        const books = await bookModel.find({});

        if (!books) {
            res.status(400);
            throw new Error("Cannot get all books!");
        }

        res.status(200).json({
            code: 200,
            message: "Success!",
            data: books,
            quantity: books.length,
        })
    });

    getOneBook = (req, res) => {};

    updateBook = (req, res) => {};

    removeBook = (req, res) => {};
}
module.exports = new BooksController();
