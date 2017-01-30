

import '../definition.js';

Meteor.publish("user-courses", function(userId) {
	return Course.find({user: userId});
});