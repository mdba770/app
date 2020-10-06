const Message = require('../models/message');
const accountSid = 'accountSid';
const authToken = 'authToken';
const client = require('twilio')(accountSid, authToken);

exports.getSendMessage = (req, res, next) => {
    res.render('send-message', { 
        pageTitle: 'Send Message', 
        path: '/'
    });
};

exports.postSendMessage = (req, res, next) => {
    const {message, phone} = req.body;

    client.messages.create({
        from: 'whatsapp:+14155238886',
        body: message,
        to: 'whatsapp:' + phone
    })
    .then(wa_message => {
        console.log(wa_message);
        const _message = new Message({
            message: wa_message.body,
            phone: wa_message.to
        });
        return _message.save();
    })
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