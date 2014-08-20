Windows Notify
==============

A notification center so Windows users can play too.

## Requirements:
[You'll need Growl for Windows Installed](http://www.growlforwindows.com/gfw/)

And you'll need to create a config.js in the application's root folder of the following form:
```javascript
var config = {
    // Gmail Account Settings
    'gmailAccount': accountName@gmailaddress.com || env.variable,
    'gmailPassword': GmailPassword || env.variable
}

module.exports = config;
```
