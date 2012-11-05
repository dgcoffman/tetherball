var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "wines"	: "list",
        "wines/page/:page"	: "list",
        "wines/add"         : "addWine",
        "wines/:id"         : "wineDetails",
        "about"             : "about",
        "login"             : "login",
        "admin"             : "admin"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    login: function() {
        if (!this.loginView) {
            this.loginView = new LoginView();
        }
        $('#content').html(this.loginView.el);
        //this.loginView.selectMenuItem('home-menu');
    },

    admin: function() {
        if (!this.adminView) {
            this.adminView = new AdminView();
        }
        $('#content').html(this.adminView.el);
        
executeHighCharts();
        //this.loginView.selectMenuItem('home-menu');
    },


    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var wineList = new WineCollection();
        wineList.fetch({success: function(){
            $("#content").html(new WineListView({model: wineList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    wineDetails: function (id) {
        var wine = new Wine({_id: id});
        wine.fetch({success: function(){
            $("#content").html(new WineView({model: wine}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addWine: function() {
        var wine = new Wine();
        $('#content').html(new WineView({model: wine}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', "AdminView", 'LoginView', 'HeaderView', 'WineView', 'WineListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});

var executeHighCharts = function() {
  var chart;
  var tooltipFormatter = function(obj) {
      var topOfHour = obj.x - (3600 * 1000 / 2);
      $("#admin-content-bottom").html('<strong>' + 
          Highcharts.dateFormat('%I:%M %p', topOfHour) + " - " + Highcharts.dateFormat('%I:%M %p', ( topOfHour + (3600 * 1000) )) +
          '</strong><br />' +
          (obj.y < 2 ? 0 : obj.y) + " points");
      return false;
  }
  chart = new Highcharts.Chart({
      chart: {
          renderTo: 'blegh',
          type: 'column'
      },
      title: null,
      xAxis: {
          type: 'datetime',
          tickInterval:  60*60*1000,
          dateTimeLabelFormats : {
              hour : '%I',
              day : '%I'
          }
      },
      yAxis: {
          min: 0,
          max: 40, 
          title: { text: "Points" }
      },
      plotOptions: {
          series: {
              pointPadding: 0,
              groupPadding: 0,      
              },
              column: {
                  borderWidth: 0
              }
      },
      tooltip: {
          formatter: function() {
              return tooltipFormatter(this);
          }
      },
      credits: {
        enabled: false
      },
      series: [{
          showInLegend: false,
          data: [
                  [Date.UTC(2012, 1, 1, 0, 30), 10], 
                  [Date.UTC(2012, 1, 1, 1, 30), 10], 
                  [Date.UTC(2012, 1, 1, 2, 30), 1],
                  [Date.UTC(2012, 1, 1, 3, 30), 1],
                  [Date.UTC(2012, 1, 1, 4, 30), 1],
                  [Date.UTC(2012, 1, 1, 5, 30), 1],
                  [Date.UTC(2012, 1, 1, 6, 30), 1],
                  [Date.UTC(2012, 1, 1, 7, 30), 1],
                  [Date.UTC(2012, 1, 1, 8, 30), 1],
                  [Date.UTC(2012, 1, 1, 9, 30), 1],
                  [Date.UTC(2012, 1, 1, 10, 30), 30],
                  [Date.UTC(2012, 1, 1, 11, 30), 20],
                  [Date.UTC(2012, 1, 1, 12, 30), 20],
                  [Date.UTC(2012, 1, 1, 13, 30), 20],
                  [Date.UTC(2012, 1, 1, 14, 30), 30],
                  [Date.UTC(2012, 1, 1, 15, 30), 30],
                  [Date.UTC(2012, 1, 1, 16, 30), 20],
                  [Date.UTC(2012, 1, 1, 17, 30), 10],
                  [Date.UTC(2012, 1, 1, 18, 30), 10],
                  [Date.UTC(2012, 1, 1, 19, 30), 10],
                  [Date.UTC(2012, 1, 1, 20, 30), 10],
                  [Date.UTC(2012, 1, 1, 21, 30), 10],
                  [Date.UTC(2012, 1, 1, 22, 30), 10],
                  [Date.UTC(2012, 1, 1, 23, 30), 10]
          ]
      }]
  });
};