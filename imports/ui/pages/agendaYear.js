

import './agendaYear.html';


Template.agendaYear.helpers({
	currentYear: function(){
		return Router.current().params.year;
	},

	monthsInYear: function() {
		return NAMED_MONTHS;
	}
});