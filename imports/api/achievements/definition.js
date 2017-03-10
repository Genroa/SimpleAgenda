import { Class } from "meteor/jagi:astronomy";





Achievement = Class.create({
	name: 'Achievement',

	collection: new Mongo.Collection('achievements'),
	
	fields: {
		name: String,
		achievementClass: {
			type: String,
			default: function() {return "Achievement";}
		},
		rewardDescription: String,
		thumbnailHTML: String,
		unlockFunction: String
	},
	
	meteorMethods: {
		checkUnlock: function() {
			if(!this.condition(userId)) return;
			
			let user = Meteor.user();
			if(!user) return;

			global[this.unlockFunction](user);

			user.achievements[this._id] = true;
		},
		condition: function(user) {
			return false;
		}
	}
});

//import './methods.js';

ViewedAdsAchievement = Achievement.inherit({
	name: "ViewedAdsAchievement",
	fields: {
		neededLevel: {
			type: Number
		},
		achievementClass: {
			type: String,
			default: function() {return "ViewedAdsAchievement";}
		}
	},

	meteorMethods: {
		condition: function(user) {
			return user.adsViewCount >= this.neededLevel;
		}
	}
});


getConvertedAchievement = function(achievement) {
	if(!achievement) return;
	if(Meteor.isClient) {
		return window[achievement.achievementClass].findOne({_id: achievement._id});
	} else if(Meteor.isServer) {
		return global[achievement.achievementClass].findOne({_id: achievement._id});
	}
}