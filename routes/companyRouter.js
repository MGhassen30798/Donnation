var express = require("express");
var router = express.Router();

const CompanyCntrl = require('../Controllers/companyController');
const authAdmin = require('../middleware/authAdmin');
const multer = require('../middleware/multer-configCompany');




router.post('/signup', multer, CompanyCntrl.signupCompany);
router.post('/login', CompanyCntrl.login);


router.get('/:id', CompanyCntrl.getCompanybyid);
router.get('/', CompanyCntrl.getAllCompany);
router.put('/:id', CompanyCntrl.updateCompany);
router.delete('/:id', CompanyCntrl.deleteCompany);




module.exports = router;