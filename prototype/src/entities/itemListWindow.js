Crafty.c('ItemListWindow', {
    init: function () {
        this.requires('Actor, Text2').color('white')
            .size(Crafty.viewport.width - 150, Crafty.viewport.height - 150)
            .centerOnScreen().attr({alpha: 0.75});
        
        this.keyPress(Crafty.keys.ESC, function() {
            this.destroy();
        })
    },

    setItems: function(items, prices) {
        this.items = items;
        this.prices = prices;
        this.fontSize(config("fontSize")).text(this.display());
    },

    display: function() {
        var toReturn = "";
        for (var i = 0; i < this.items.length; i++) {
            toReturn += this.items[i] + ": &nbsp;" + this.prices[i] + " coins <br />";
        }
        return toReturn;
    }
});