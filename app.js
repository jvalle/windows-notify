var Notification = require('node-notifier'),
    config = require('./config.js');

if (config.gmailAccount) {
    var imapListener = require('./modules/imap-listener'),
        ml = imapListener.init(),
        messageIDs = [];

    ml.start();

    ml.on('server:connected', function () {
        console.log('Imap Connected');
    });

    ml.on('mail', function (mail, seqno, attributes) {
        if (messageIDs.indexOf(seqno) < 0) {
            notify(imapListener.buildEmailNotice(mail));
            messageIDs.push(seqno);
        }
    });
}

function notify (notice) {
    var notifier = new Notification();    
    notifier.notify(notice);
}