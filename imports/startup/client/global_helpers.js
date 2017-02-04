import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';

Template.registerHelper("setTitle", function(title){
	if(title){
		document.title = title;
	}
	else{
		console.log("setTitle called without title!");
	}
});


Template.registerHelper("getInfoMessage", function() {
	return Session.get("infoMessage");
});

// Retourne le mois à partir de son numéro (partant de 1) dans la liste des mois
Template.registerHelper("getNamedMonth", function(value) {
	return NAMED_MONTHS[value-1];
});

// Retourne le nom du jour de la semaine à partir de sa position (partant de 0) dans la liste des jours de la semaine
Template.registerHelper("getNamedDayOfWeek", function(value) {
	return NAMED_DAYS_OF_WEEK[(value+6)%7];
});

// Retourne le nom du jour de la semaine à partir de sa position dans le mois, du mois, et de l'année
Template.registerHelper("getNamedDayOfWeekFromMonthAndYear", function(year, month, day) {
	return NAMED_DAYS_OF_WEEK[(new Date(year, month-1, day).getDay()+6)%7];
});

Template.registerHelper("getCourseNameById", function(id) {
	let c = Course.findOne({_id: id});
	return c && c.name;
});

Template.registerHelper("getCourseColorById", function(id) {
	let c = Course.findOne({_id: id});
	return c && c.color;
});
