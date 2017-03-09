
import '../definition.js';


if(!ViewedAdsAchievement.findOne({neededLevel: 20})) {
	let a = new ViewedAdsAchievement({name: "Première étape!", 
									  rewardDescription: "Ajoute un nouvel emplacement de couleurs à votre palette!",
									  thumbnailHTML: '<span>20</span>',
									  neededLevel: 20});
	a.save();
	console.log("Saved new 20 views achievement");
}

if(!ViewedAdsAchievement.findOne({neededLevel: 50})) {
	let a = new ViewedAdsAchievement({name: "On prend ses marques?", 
									  rewardDescription: "Ajoute un nouvel emplacement de couleurs à votre palette!",
									  thumbnailHTML: '<span>50</span>',
									  neededLevel: 50});
	a.save();
	console.log("Saved new 50 views achievement");
}