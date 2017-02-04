

import './agendaMonth.html';


Template.agendaMonth.helpers({
	currentYear: function(){
		return Router.current().params.year;
	},
	currentMonth: function(){
		return Router.current().params.month;
	},

	daysInMonth: function() {
		 // Since no month has fewer than 28 days
		 var year = parseInt(Router.current().params.year);
		 var month = parseInt(Router.current().params.month);

		 var date = new Date(year, month, 1);
		 var days = [];

		 while (date.getMonth() === month) {
			days.push(new Date(date));
			date.setDate(date.getDate() + 1);
		 }
		 return days;
	}
});
