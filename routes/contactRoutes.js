const express = require('express');
const validateObjectId = require('../middleware/validateObjectId');
const {
    getContacts,
    deleteContact,
    createContact,
    updateContact,
    getContact
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateToken);

router.route('/').get(getContacts).post(createContact)

router.route('/:id').put(validateObjectId,updateContact).delete(validateObjectId,deleteContact).get(validateObjectId,getContact)


module.exports = router;