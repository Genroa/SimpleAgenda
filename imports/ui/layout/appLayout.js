

import './appLayout.html';

Template.appLayout.onRendered(function(){
	$(".button-collapse").sideNav({
		menuWidth: 300, // Default is 300
		closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
		draggable: true // Choose whether you can drag to open on touch screens
	});
	console.log("sideNav");
});

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