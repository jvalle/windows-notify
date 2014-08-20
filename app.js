var Notification = require('node-notifier');

var notifier = new Notification();

notifier.notify({
	title: 'Test Notification?',
	message: 'Does this actually work?'
}, function (err, res) {
	console.log(res);
});