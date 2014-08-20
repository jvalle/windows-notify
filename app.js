var MailListener = require('mail-listener2'),
    Notification = require('node-notifier');

var config = require('./config.js');

var mailListener = new MailListener({
    username: config.gmailAccount,
    password: config.gmailPassword,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    mailbox: 'INBOX',
    markSeen: false,
    fetchUnreadOnStart: false, // use it only if you want to get all unread email on lib start. Default is `false`,
    mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
    attachments: true, // download attachments as they are encountered to the project directory
    attachmentOptions: { directory: "attachments/" }
});

mailListener.start();

mailListener.on('server:connected', function () {
    console.log('iMapConnected');
});

mailListener.on('mail', function (mail, seqno, attributes) {
    console.log('emailParsed', mail);
    buildEmailNotice(mail, notify);
});

function buildEmailNotice (email, callback) {
    var notice = {};

    notice.title = 'E-mail from ' + email.from[0].name + ' (' + email.from[0].address + ')';
    notice.message = email.subject;
    notice.type = 'email';
    if (email.priority !== 'normal') {
        notice.sticky = true;
    } else {
        notice.sticky = false;
    }

    callback(notice);
}

function notify (notice) {
    var notifier = new Notification();

    if (notice.type === 'email') {
        notice.iconDir = __dirname + '/images/gmail.png';
    }
    
    notifier.notify({
        title: notice.title,
        message: notice.message,
        icon: notice.iconDir,
        sticky: notice.sticky
    });
}