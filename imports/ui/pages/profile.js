
import '../components/colorPalette.js';
import './profile.html';


Template.profile.onRendered(function(){
	
});


Template.profile.helpers({
	'userUnlockedAchievement' : function(achievement) {
		let user = Meteor.user();
		return user && achievement && user.achievements && user.achievements[achievement._id] === true;
	},

	'getUserDefinedColors' : function() {
		let user = Meteor.user();
		return user && user.definedColors && Object.values(user.definedColors);
	}
});


Template.profile.events({
	'click' : function(evt) {
		$(".jscolor").each(function(index, elem) {
			let jsColorId = "#jscolor_"+elem.dataset.index;
			$(elem).css("color", $(elem).css("backgroundColor").toUpperCase());
		});
	}
});