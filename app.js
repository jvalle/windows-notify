var Notification = require('node-notifier'),
    config = require('./config.js');

if (config.gmailAccount) {
    var imapListener = require('./modules/imap-listener'),
        ml = imapListener.init(),
        unreadMail = [];

    ml.start();

    ml.on('server:connected', function () {
        console.log('Imap Connected');
    });

    ml.on('message', function (mail, seqno, attributes) {
        console.log(seqno);
        notify(imapListener.buildEmailNotice(mail));
    });
}

function notify (notice) {
    var notifier = new Notification();    
    notifier.notify(notice);
}