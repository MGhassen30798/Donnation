const express = require('express');
const router = express.Router();
const UserCtrl = require('../Controllers/admin');
const CompanyCntrl = require('../Controllers/companyController');
const adminCtrl = require('../Controllers/admin');



router.post('/signup', adminCtrl.signup)
router.post('/login', adminCtrl.login)





module.exports = router;