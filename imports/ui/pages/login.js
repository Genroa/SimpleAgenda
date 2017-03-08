
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

		let pseudo = $('.login_form #textfield_username').val();
		let pwd = $('.login_form #textfield_password').val();

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

		let pseudo = $('.register_form #textfield_new_username').val();
		let email = $('.register_form textfield_new_email').val();
		let pwd = $('.register_form #textfield_new_password').val();

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
	}

});
