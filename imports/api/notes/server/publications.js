

import '../definition.js';


Meteor.publish("user-notes", function(userId, date) {
	return Note.find({user: userId, date: date});
});