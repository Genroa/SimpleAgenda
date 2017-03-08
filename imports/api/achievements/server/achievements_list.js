
import '../definition.js';


if(!ViewedAdsAchievement.findOne({neededLevel: 50})) {
	let a = new ViewedAdsAchievement({name: "Première étape!", neededLevel: 50});
	a.save();
	console.log("Saved new 50 views achievement");
}