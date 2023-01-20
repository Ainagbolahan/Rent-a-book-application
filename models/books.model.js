const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
	{
		title: String,
		price: String,
		author: String,
		description: String,
		year: String,
	},
	{
		timestamps: true,
	}
);

bookSchema.index({ "title": "text", "author": "text", "description": "text" });

const Book = model("Book", bookSchema);
module.exports = { Book };
