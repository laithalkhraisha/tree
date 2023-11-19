const express = require('express');
const router = express.Router();
const yourController = require('../controller/contactController');




router.post('/add', yourController.createContact);
router.get('/get',yourController.getAllContacts);


module.exports = router;
