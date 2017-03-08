import { Class } from "meteor/jagi:astronomy";




Achievement = Class.create({
	name: 'Achievement',
	achievementClass: 'Achievement',
	collection: new Mongo.Collection('achievements'),
	fields: {
		name: String
	},
	meteorMethods: {
		checkUnlock: function() {
			if(!this.condition(userId)) return;
			
			let user = Meteor.user();
			if(!user) return;

			user.achievements[this._id] = true;
		},
		condition: function(user) {
			return false;
		}
	}
});

//import './methods.js';