// Clicking on this window, dividing by font size, is not quite enough; we need to divide
// buy roughly 1.1x the fontsize in order to get click handling to map to the right items.
// This could be font-dependent; if you change this, test with the max items that fit in
// the window (eg. 9), click the first and last items, then the middle ones, and see how it goes.
const CLICK_OFFSET_MULTIPLIER = 1.1;

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
        });

        this.onClick(function(data) {
            var localY = data.clientY - this.y;
            var selectedItemIndex = Math.floor(localY / config("fontSize") / CLICK_OFFSET_MULTIPLIER);            
            if (selectedItemIndex < 0 || selectedItemIndex >= this.items.length) {
                throw "Click index out of range of items; check CLICK_OFFSET_MULTIPLIER."
            }
            var item = this.items[selectedItemIndex];
            this.buyItem(item);            
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
        }
    },
    // TODO: move to non-inventory subclass
    buyItem: function(item) {
        var player = Crafty('Player');
        player.inventory.push(item);
        console.log("Bought " + item.name);
        this.items = this.items.filter(i => i !== item);
        this.display();        
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