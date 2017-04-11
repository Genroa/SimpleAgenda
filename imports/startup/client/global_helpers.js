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

Template.registerHelper("getUserAdsViewCount", function(givenUser) {
	if(!givenUser) {
		let user = Meteor.user();
		return user && user.adsViewCount;
	}
	return givenUser && givenUser.adsViewCount;
});


Template.registerHelper("range", function(start, end, loopStep) {
	var range = [];
	var typeofStart = typeof start;
	var typeofEnd = typeof end;

	if (loopStep === 0) {
		throw TypeError("Step cannot be zero.");
	}
	
	console.log(start);
	console.log(end);
	console.log(loopStep);

	if (typeofStart == "undefined" || typeofEnd == "undefined") {
		throw TypeError("Must pass start and end arguments.");
	} else if (typeofStart != typeofEnd) {
		throw TypeError("Start and end arguments must be of same type.");
	}

	if(typeof loopStep == "undefined") {
		throw TypeError("Muss define step in range.");
	}

	if (end < start) {
		loopStep = -loopStep;
	}

	if (typeofStart == "number") {
		console.log(end >= start);
		while (loopStep > 0 ? end > start : end < start) {
			range.push(start);
			start += loopStep;
		}

	} else if (typeofStart == "string") {

		if (start.length != 1 || end.length != 1) {
			throw TypeError("Only strings with one character are supported.");
		}

		start = start.charCodeAt(0);
		end = end.charCodeAt(0);

		while (loopStep > 0 ? end > start : end < start) {
			range.push(String.fromCharCode(start));
			start += loopStep;
		}

	} else {
		throw TypeError("Only string and number types are supported");
	}

	return range;
});

Template.registerHelper("getUserDefinedColors", function() {
	let user = Meteor.user();
	return user && user.definedColors && Object.values(user.definedColors);
});