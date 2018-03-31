Crafty.c('BarterMenu', {
    init: function () {
        this.requires('Actor, Text2').color('white')
            .size(Crafty.viewport.width - 150, Crafty.viewport.height - 150)
            .centerOnScreen();
    },

    setItems: function(items, prices) {
        this.items = items;
        this.prices = prices;
        this.fontSize(config("fontSize")).text(this.display());
    },

    display: function(items) {
        var toReturn = "";
        for (var i = 0; i < this.items.length; i++) {
            toReturn += this.items[i] + ": &nbsp;" + this.prices[i] + " coins <br />";
        }
        return toReturn;
    }
});