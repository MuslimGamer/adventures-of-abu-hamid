Crafty.c('ItemListWindow', {
    init: function () {
        this.requires('Actor, Text2').color('white')
            .size(Crafty.viewport.width - 150, Crafty.viewport.height - 150)
            .centerOnScreen().attr({alpha: 0.75});
        
        this.keyPress(Crafty.keys.ESC, function() {
            this.destroy();
        })
    },

    setItems: function(items) {
        this.items = items;
        this.display();
        this.bind("KeyUp", this.buy);
    },

    buy: function(e) {
        var key = e.key;
        // the index number of the item to be bought
        var num = key - 48;
        if (this.items.length >= num) {
            this.buyItem(this.items[num - 1]);
            this.display();
        }
    },

    buyItem: function(item) {
        var player = Crafty('Player');
        player.inventory.push(item)
        this.items = this.items.filter(i => i !== item)
    },

    display: function() {
        this.fontSize(config("fontSize")).text(this.itemsListString());        
    },

    itemsListString: function() {
        var toReturn = "";
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            toReturn += (i + 1) + '. ' + item.name + ": &nbsp;" + item.price + " coins <br />";
        }
        return toReturn;
    }
});