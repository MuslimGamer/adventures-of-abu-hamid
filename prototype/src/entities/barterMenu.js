Crafty.c('BarterMenu', {
    init: function () {
        this.requires('Actor, Text2').color('white')
            .size(Crafty.viewport.width - 150, Crafty.viewport.height - 150)
            .centerOnScreen();
    },

    setItems: function(items) {
        this.items = items;
        this.fontSize(config("fontSize")).text(this.display());
    },

    display: function(items) {
        var toReturn = "";
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            toReturn += item.name + ": &nbsp;" + item.price + " coins <br />";
        }
        return toReturn;
    }
});