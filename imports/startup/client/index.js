

/*
Fichier ne contenant que les imports des fichiers startup, pour g�rer leur ordre d'import
*/


SubscriptionManager = new SubsManager();

Tracker.autorun(function() {
    if(Meteor.userId()) {
        SubscriptionManager.subscribe("user-courses", Meteor.userId());
        SubscriptionManager.subscribe("user-notes", Meteor.userId());
        SubscriptionManager.subscribe("achievements", Meteor.userId());
        SubscriptionManager.subscribe("userData", Meteor.userId());
    } else {
        SubscriptionManager.clear();
    }
});

import './api_definitions.js';
import './pages.js';
import './routing.js';
import './global_helpers.js';
import './lib/jscolor.min.js';
import './constants.js';
