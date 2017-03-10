
import '../definition.js';


addColorChoiceOnUnlock = function(user) {
	user.definedColors[user.maxColors] = "#000000";
	user.maxColors += 1;
	Meteor.users.update(user._id, {
		$set: {
			maxColors: user.maxColors+1,
			definedColors: user.definedColors
		}
	});
}



if(!ViewedAdsAchievement.findOne({neededLevel: 20})) {
	let a = new ViewedAdsAchievement({name: "Première étape!", 
									  rewardDescription: "Ajoute un nouvel emplacement de couleurs à votre palette!",
									  thumbnailHTML: '<span>20</span>',
									  unlockFunction: 'addColorChoiceOnUnlock',
									  neededLevel: 20});
	a.save();
	console.log("Saved new 20 views achievement");
}

if(!ViewedAdsAchievement.findOne({neededLevel: 50})) {
	let a = new ViewedAdsAchievement({name: "On prend ses marques?", 
									  rewardDescription: "Ajoute un nouvel emplacement de couleurs à votre palette!",
									  thumbnailHTML: '<span>50</span>',
									  unlockFunction: 'addColorChoiceOnUnlock',
									  neededLevel: 50});
	a.save();
	console.log("Saved new 50 views achievement");
}