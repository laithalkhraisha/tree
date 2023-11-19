const express = require('express');
const router = express.Router();
const donorController = require('../controller/donorController');

router.get('/donor/:id', donorController.getDonorProfile);
router.post('/donor', donorController.createDonor);
router.get('/donors', donorController.getAllDonors);
router.put('/donor/:id', donorController.updateDonor);
router.delete('/donor/:id', donorController.deleteDonor);
module.exports = router;
