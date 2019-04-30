const express = require('express');
const controller = require('../controllers/articles');

const router = express.Router();

router.post('/articles', controller.createArticle);
router.put('/articles/:id', controller.updateArticle);
router.get('/articles', controller.getArticlesByQuery);
router.get('/articles/:id', controller.getArticleById);

module.exports = router;
