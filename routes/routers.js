const express = require('express');
const router = express.Router();

const connectRoutes = require('./conatctRoute');
const userRoutes = require('./userRoutes');
const doneorRoutes = require('./donorRoutes');
const paymentRoutes = require('./paymentRoute');




router.use('/contact',connectRoutes);
router.use('/user',userRoutes);
router.use('/doner',doneorRoutes);
router.use('/payment',paymentRoutes);






module.exports = router;
