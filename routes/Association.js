var express = require("express");
var router = express.Router();

const AssociationCntrl = require('../Controllers/Association');
const authAdmin = require('../middleware/authAdmin');
const multer = require('../middleware/multer-configCompany');




router.post('/signup', multer, AssociationCntrl.signupAssociation);
router.post('/login', AssociationCntrl.login);


router.get('/:id', AssociationCntrl.getAssociationbyid);
router.get('/', AssociationCntrl.getAllAssociation);
router.put('/:id', AssociationCntrl.updateAssociation);
router.delete('/:id', AssociationCntrl.deleteAssociation);




module.exports = router;