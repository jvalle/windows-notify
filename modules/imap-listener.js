var MailListener = require('mail-listener2'),
    config = require('../config.js');

var imapListener = {};

// function to generate our new mailListener Instance
imapListener.init = function () {
    return new MailListener({
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
};

imapListener.buildEmailNotice = function (email, callback) {
    var notice = {};

    notice.title = 'E-mail from ' + email.from[0].name + ' (' + email.from[0].address + ')';
    notice.message = email.subject;
    notice.icon = __dirname + '/images/gmail.png';
    // adding a url member to the object to coincide with growler 0.0.2 callbackurl.  need to update this manually
    // also, i don't like opening a new gmail window on every click so i want to find a nicer way to do this
    notce.url = 'http://mail.google.com'

    if (email.priority !== 'normal') {
        notice.sticky = true;
    } else {
        notice.sticky = false;
    }

    return notice;
};

module.exports = imapListener;