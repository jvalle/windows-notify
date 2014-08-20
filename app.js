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
    fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
    mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
    attachments: true, // download attachments as they are encountered to the project directory
    attachmentOptions: { directory: "attachments/" }
});

mailListener.start();

mailListener.on('server:connected', function () {
    console.log('iMapConnected');
});



var notifier = new Notification();

notifier.notify({
    title: 'Test Notification?',
    message: 'Does this actually work?'
});