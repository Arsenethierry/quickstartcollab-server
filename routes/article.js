const express = require('express');
const { getArticles, postArticle, deleteArticle} = require('../controllers/articles.js');

const router = express.Router();

// router.get('/search', getArticlesBySearch);
router.get('/', getArticles);
// router.get('/:id', getArticle);

router.post('/', postArticle);

router.delete('/:id', deleteArticle);


module.exports = router;