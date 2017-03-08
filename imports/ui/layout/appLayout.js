

import './appLayout.html';

Template.appLayout.events({
	'click .menu_link' (event) {
		//$(".button-collapse").hide();
		//$("#sidenav-overlay").hide();
		console.log("hide");
	},

	'click .logout' (event) {
		event.preventDefault();
		Meteor.logout();
		//$(".button-collapse").sideNav('destroy');
	}
});
