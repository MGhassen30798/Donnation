const express = require('express');
const router = express.Router();
const ArticleCntrl = require('../Controllers/articlesController');
const multer = require('../middleware/multer-configArticle');




router.get('/:id', ArticleCntrl.getArticlesbyid);


router.get('/company/:brand', ArticleCntrl.getArticlesbyidbrand);

router.get('/type/:type', ArticleCntrl.getArticlesbyType);

router.post('/', multer, ArticleCntrl.createArticles);


router.get('/', ArticleCntrl.getAllArticles);

router.put('/:id', multer, ArticleCntrl.updateArticles);

router.delete('/:id', ArticleCntrl.deleteArticles);


module.exports = router;