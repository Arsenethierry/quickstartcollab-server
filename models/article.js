const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    type: {
        type: String,
        required: true
    },
    selectedFile: String,
    likes: [String],
    cretedAt: {
        type: Date,
        default: new Date(),
    },
})

const Article = mongoose.model('Article', articleSchema);
exports.Article = Article;