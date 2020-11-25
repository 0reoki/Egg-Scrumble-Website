const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
    _someId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    search_text: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Search = mongoose.model('search', searchSchema);

module.exports = Search;