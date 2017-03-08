import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.publish("userData", function(userId) {
	return Accounts.users.find({_id: userId});
});