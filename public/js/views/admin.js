window.AdminView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    },
    hi: function() {
		alert('ohai');
    }
});


