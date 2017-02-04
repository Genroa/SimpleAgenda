

import '../definition.js';


Meteor.publish("user-notes", function(userId) {
	return Note.find({user: userId});
});
