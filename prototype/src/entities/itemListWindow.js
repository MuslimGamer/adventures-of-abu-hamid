Crafty.c('ItemListWindow', {
    // Singleton by force. Like, brute force...
    init: function () {
        var self = this;
        Crafty.forEach("ItemListWindow", function(window) {
            if (window != self) {
                window.destroy();
            }
        });
        
        this.requires('Actor, Text2').color('white')
            .size(Crafty.viewport.width - 150, Crafty.viewport.height - 150)
            .centerOnScreen().attr({alpha: 0.75});
        
        this.onKeyPress(Crafty.keys.ESC, function() {
            this.destroy();
        })
    },

    setItems: function(items) {
        this.items = items;
        this.display();
        this.bind("KeyUp", this.buy);
    },

    // TODO: move to non-inventory subclass
    buy: function(e) {
        var key = e.key;
        // the index number of the item to be bought
        var num = key - 48;
        if (this.items.length >= num) {
            this.buyItem(this.items[num - 1]);
            this.display();
        }
    },
    // TODO: move to non-inventory subclass
    buyItem: function(item) {
        var player = Crafty('Player');
        player.inventory.push(item);
        console.log("Bought " + item.name);
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