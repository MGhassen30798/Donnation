var express = require("express");
var router = express.Router();

const cashCntrl = require('../Controllers/cash');
const multer = require('../middleware/multer-configCompany');




router.post('/', multer, cashCntrl.createArticles);
router.get('/', cashCntrl.getArticlesbyid);




module.exports = router;