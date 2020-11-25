const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    copy: {
        type: Buffer, // store directly pdf file
        //type: String, // store link for pdf file
        required: true
    },
    cover: {
        type: Buffer,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    language: {
        type: [String],
        required: true
    },
    release_date: {
        type: Date,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        required: true
    },
    modified_by: {
        type: String,
        required: true
    },
    modified_date: {
        type: Date,
        required: true
    }
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;