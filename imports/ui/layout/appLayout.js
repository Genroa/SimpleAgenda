

import './appLayout.html';


Template.appLayout.helpers({
	'isConnected': function() {
		return Meteor.user() ? "" : "display: none";
	},
	'isConnectedDrawerCSS' : function() {
		return Meteor.user() ? "" : "<style>.mdl-layout__drawer-button {display: none !important;}</style>";
	}
});

Template.appLayout.events({
	'click .drawer_link' (event) {
		// Close drawer
		var d = document.querySelector('.mdl-layout');
		if(d) d.MaterialLayout.toggleDrawer();
	},

	'click .logout' (event) {
		event.preventDefault();
		Meteor.logout();
	}
});
