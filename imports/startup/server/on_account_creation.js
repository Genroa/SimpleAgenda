
import { Accounts } from 'meteor/accounts-base'

Accounts.onCreateUser(function(options, user) {
	
	console.log("Created new user");
	user.achievements = {};
	return user;
});