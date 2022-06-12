var express = require("express");
var router = express.Router();

const factureCntrl = require('../Controllers/facture');
const multer = require('../middleware/multer-configCompany');




router.post('/', factureCntrl.createFacture);
router.get('/refuser/:refuser', factureCntrl.getAllFactureByUser);




module.exports = router;