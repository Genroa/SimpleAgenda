

import './agendaMonth.html';


Template.agendaMonth.helpers({
	currentYear: function(){
		return Router.current().params.year;
	},
	currentMonth: function(){
		return Router.current().params.month;
	},

	previousMonthLink: function(year, month){
		let newYear = parseInt(year);
		let newMonth = parseInt(month)-1;
		
		if(newMonth == 0) {
			newYear = newYear-1;
			newMonth = 12;
		}

		return newYear+"/"+newMonth;
	},

	nextMonthLink: function(year, month){
		let newYear = parseInt(year);
		let newMonth = parseInt(month)+1;
		
		if(newMonth == 13) {
			newYear = newYear+1;
			newMonth = 1;
		}

		return newYear+"/"+newMonth;
	},

	daysInMonth: function() {
		 // Since no month has fewer than 28 days
		 var year = parseInt(Router.current().params.year);
		 var month = parseInt(Router.current().params.month-1);

		 var date = new Date(year, month, 1);
		 var days = [];
		 
		 while (date.getMonth() === month) {
			days.push(new Date(date));
			date.setDate(date.getDate() + 1);
		 }
		 return days;
	}
});

