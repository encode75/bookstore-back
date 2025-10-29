// models/User.js
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    }
});

const Book = mongoose.model('Book', bookSchema);

export default Book;