const Message = require('../models/message');

exports.getSendMessage = (req, res, next) => {
    res.render('send-message', { 
        pageTitle: 'Send Message', 
        path: '/'
    });
};

exports.postSendMessage = (req, res, next) => {
    const {message, phone} = req.body;
    const _message = new Message({
        message,
        phone
    });
    _message
        .save()
        .then(result => {
            console.log('Message sent successfully.');
            res.redirect('/messages');
        })
        .catch(err => {
            console.log(err);
        });
    
};

exports.getMessages = (req, res, next) => {
    Message.find({ createdAt: {$gt: new Date(Date.now() - 86400000) } })
    .sort({createdAt: -1})
    .then(messages => {
        console.log(messages);
        res.render('messages', {
            messages: messages,
            pageTitle: 'Messages',
            path: '/messages'
        });
    })
    .catch(err => {
        console.log(err);
    });
};