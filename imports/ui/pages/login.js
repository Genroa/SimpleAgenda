
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './login.html';

Template.login.events({
	'submit .login_form'(event) {
		// Prevent default browser form submit
		event.preventDefault();
		Session.set("infoMessage", "Tentative de connexion...");

		let pseudo = $('.login_form .pseudo').val();
		let pwd = $('.login_form .password').val();

		Meteor.loginWithPassword(pseudo, pwd, function(err) {
			if(!err) {
				console.log("no error");
				Session.set("infoMessage", undefined);
				Router.go('home');
			}
			else {
				console.log("got error " + err.reason);
				Session.set("infoMessage", err.reason);
			}
		});
	},
	
	'submit .register_form'(event) {
		// Prevent default browser form submit
		event.preventDefault();
		Session.set("infoMessage", undefined);
		console.log("création du compte...");

		let pseudo = $('.register_form .pseudo').val();
		let email = $('.register_form .email').val();
		let pwd = $('.register_form .password').val();

		let userInfos = {
			username: pseudo,
			password: pwd,
			email: email
		};

		Accounts.createUser(userInfos, function(err) {
			if(!err) {
				Router.go('home');
			}
			else {
				console.log("erreur:"+err.reason);
				Session.set("infoMessage", err.reason);
			}
		});
	},

	'click .toggle'(event) {
		$('.container').stop().addClass('active');
	},

	'click .close'(event) {
		$('.container').stop().removeClass('active');
	}

});
