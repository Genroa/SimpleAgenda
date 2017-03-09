
import { Accounts } from 'meteor/accounts-base'

Accounts.onCreateUser(function(options, user) {
	
	console.log("Created new user");
	user.achievements = {};
	user.adsViewCount = 0;
	
	user.maxColors = 5;
	user.definedColors = {
		0: "#000000",
		1: "#000000",
		2: "#000000",
		3: "#000000",
		4: "#000000"
	};

	return user;
});