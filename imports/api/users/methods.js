


Meteor.methods({
	"changeColorPalette" : function(index, newColor) {
		let user = Meteor.user();

		if(!user) return;

		if(user.maxColors <= index) return;

		user.definedColors[index] = newColor;

		Meteor.users.update(user._id, {
			$set: {
				definedColors: user.definedColors
			}
		});
	}
});
