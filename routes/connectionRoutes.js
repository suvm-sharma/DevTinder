const express = require('express');
const connectionController = require('../controller/connectionController')
const autController = require('../controller/authController');
const connectionReqValidation = require('../validations/connectionRequestValidation');
const validate = require('../middleware/validate');

const router = express.Router();

router.post(
    '/send/:status/:receiverId', 
    validate(connectionReqValidation.sendConnection),
    autController.protect, connectionController.sendConnectionReq)

router.patch(
    '/review/:status/:senderId', 
    validate(connectionReqValidation.reviewConnectionRequest),
    autController.protect, connectionController.reviewConnectionReq)

module.exports = router;