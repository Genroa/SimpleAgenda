import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.publish("userData", function(userId) {
	return Accounts.users.findOne({_id: userId});
});