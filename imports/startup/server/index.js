import { Meteor } from 'meteor/meteor';


Meteor.startup(() => {
	import './on_account_creation.js';
	import '../../api/courses/server/publications.js';
	import '../../api/notes/server/publications.js';
	import '../../api/achievements/server/publications.js';
	import '../../api/users/server/publications.js';
	//import './fake_imports.js';
});