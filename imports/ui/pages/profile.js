

import './profile.html';


Template.profile.helpers({
	'userUnlockedAchievement' : function(achievement) {
		let user = Meteor.user();
		return user && achievement && user.achievements && user.achievements[achievement._id] === true;
	}
});