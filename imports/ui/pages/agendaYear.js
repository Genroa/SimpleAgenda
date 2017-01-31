

import './agendaYear.html';


Template.agendaYear.helpers({
	currentYear: function(){
		return Router.current().params.year;
	},
	
	previousYear: function() {
		return parseInt(Router.current().params.year)-1;
	},
	
	nextYear: function() {
		return parseInt(Router.current().params.year)+1;
	}
});
