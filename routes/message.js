const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message');

router.get('/', messageController.getSendMessage);
router.post('/send-message', messageController.postSendMessage);
router.get('/messages', messageController.getMessages);

module.exports = router;