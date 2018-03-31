Crafty.c('BarterMenu', {
    init: function () {
        this.requires('Actor').color('white')
            .size(Crafty.viewport.width - 150, Crafty.viewport.height - 150)
            .centerOnScreen();
    },

    setItems: function(items) {
        this.items = items;
        console.log(this.items);
    }
});