const { Book } = require("../models/books.model");
const { User } = require("../models/user.model");


const addBookController = async (req, res) => {
    try {
        const { title, price, description,  } = req.body;

        if (!title && price && description)
        return res.status(400).json({
          message: "Title, Price and description is required",
        });
      let book = await Book.create(req.body);
      return res.status(201).json({
        message: "Book created",
        data: book,
      });


	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "internal server issues",
		});
	}
};

const fetchAllBooks = async (req, res) => {
    try {
      let books = await Book.find({});
      return res.status(200).json({
        message: "Books fetched",
        data: books,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json("server issues");
    }
};
  
module.exports = {
    fetchAllBooks,
    addBookController
}
