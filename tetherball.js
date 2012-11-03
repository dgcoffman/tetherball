if (Meteor.isClient) {

Template.home.selected = function () {
  return Session.equals('currentView', 'home');
};

Template.about.selected = function () {
  return Session.equals('currentView', 'about');
};

Template.contact.selected = function () {
  return Session.equals('currentView', 'contact');
};

Template.login.selected = function () {
  return Session.equals('currentView', 'login');
};

Template.navigation.user = function () {

  return Meteor.user();
};

var Router = Backbone.Router.extend({
        routes: {
            "logout": "logOut",
            "*actions": "defaultRoute" // Backbone will try match the route above first
        },
        logOut: function ()
        {
          Meteor.logout();
        }
    });

    // Instantiate the router
    var app_router = new Router();

    app_router.on('route:defaultRoute', function (actions) {
        Session.set("currentView", actions);
        this.navigate(actions, true);
    });

    Backbone.history.start();

  Meteor.startup(function () {
    
  });
}