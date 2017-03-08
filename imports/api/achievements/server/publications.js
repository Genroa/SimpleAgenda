
import '../definition.js';

Meteor.publish("achievements", function() {
	return Achievement.find({});
});