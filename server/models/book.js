const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String,
});

// "model" mean a collectio
module.exports = mongoose.model('Book', bookSchema);
