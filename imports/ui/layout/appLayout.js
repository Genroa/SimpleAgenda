

import './appLayout.html';


Template.appLayout.helpers({
	'isConnected': function() {
		return Meteor.user() ? "" : "display: none";
	},
	'additionalDrawerCSS' : function() {
		let hideDrawerOnLargeScreens = "<style>@media screen and (min-width:1025px) {.mdl-layout__drawer-button {display: none !important;}}</style>";
		return Meteor.user() ? hideDrawerOnLargeScreens : hideDrawerOnLargeScreens+"<style>.mdl-layout__drawer-button  {display: none !important;}</style>";
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