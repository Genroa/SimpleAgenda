

import './agendaMonth.html';
import './agendaMonth.css';

import '../components/dayBlock.js';


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
	},

	buildPreviousMonthDays: function(days) {
		console.log("call");
		let firstDay = (days[0].getDay()+6)%7;
		let blocs = "";
		for(let i=0; i<firstDay; i++) {
			blocs = blocs + "<td></td>";
		}
		return blocs;
	},

	isSunday: function(day) {
		console.log(day+" is sunday? "+(day.getDay() == 0));
		return (day.getDay() === 0 ? "<!-- end --></tr><tr>" : "");
	},

	buildWeek: function(weekNumber, days) {
		console.log("WEEK NUMBER "+weekNumber);

		let output = "";
		let firstDay = days[0];
		let daysNumberBeforeMonth = (firstDay.getDay()+6)%7;

		console.log(daysNumberBeforeMonth+" before beginning of the month");

		// Fill beginning with blanks
		if(weekNumber === 0) {
			for(let i=0; i<daysNumberBeforeMonth; i++) {
				output = output + "<td></td>";
			}
		}

		let daysToCount = daysNumberBeforeMonth+days.length;
		let beginningOfWeek = 7*weekNumber;
		let daysToWrite = 7;

		if(beginningOfWeek < daysNumberBeforeMonth) {
			beginningOfWeek += daysNumberBeforeMonth;
			daysToWrite -= beginningOfWeek;
		}

		console.log(daysToCount+" existing, beginning of this week is in position "+beginningOfWeek+". Will write "+daysToWrite+" days");

		// Fill end with blanks
		if(weekNumber > 0) {
			if(days.length - (beginningOfWeek - daysNumberBeforeMonth) < 7) {
				console.log("end of month, "+(days.length-(beginningOfWeek- daysNumberBeforeMonth ))+" "+days.length+" "+beginningOfWeek);
				daysToWrite = days.length - (beginningOfWeek - daysNumberBeforeMonth);
			}
		}
		let year = Router.current().params.year;
		let month = Router.current().params.month;

		for(let i = beginningOfWeek; i < beginningOfWeek+daysToWrite; i++) {
			let day = days[i-daysNumberBeforeMonth].getDate();
			output += "<td><a href='/agenda/"+year+"/"+month+"/"+day+"/'>"
				+ "<div class='dayNumber'>"+day+"</div>"
				+ "</a></td>";
		}

		return output;
	}
});
