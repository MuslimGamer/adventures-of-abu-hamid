// Clicking on this window, dividing by font size, is not quite enough; we need to divide
// buy roughly 1.1x the fontsize in order to get click handling to map to the right items.
// This could be font-dependent; if you change this, test with the max items that fit in
// the window (eg. 9), click the first and last items, then the middle ones, and see how it goes.
const CLICK_OFFSET_MULTIPLIER = 1.1;

Crafty.c('MerchantListWindow', {
    // Singleton by force. Like, brute force...
    init: function () {
        var self = this;
        Crafty.forEach("MerchantListWindow", function(window) {
            if (window != self) {
                window.destroy();
            }
        });
        
        this.requires('InventoryListWindow');

        this.onClick(function(data) {
            var localY = data.clientY - Crafty.viewport.y - this.y;
            var selectedItemIndex = Math.floor(localY / config("fontSize") / CLICK_OFFSET_MULTIPLIER);            
            this.buyItem(selectedItemIndex);            
        });

        this.buySellToggle = Crafty.e("BuySellToggle");
    },

    remove: function() {
        this.buySellToggle.die();
    },

    buy: function(e) {
        var key = e.key;
        // the index number of the item to be bought
        var num = key - 48;
        this.buyItem(num - 1);
    },

    buyItem: function(itemIndex) {        
        if (itemIndex >= 0 && itemIndex < this.items.length) {
            var item = this.items[itemIndex];
            var player = Crafty('Player');

            if (player.dinars >= item.price) {

                var copy = Object.assign({}, item);
                // If we already own it, increment our quantity by 1
                var existing = player.inventory.filter(i => i.name == item.name);
                if (existing.length == 0) {
                    copy.quantity = 1;
                    player.inventory.push(copy);
                } else {
                    existing[0].quantity += 1;
                }
                player.dinars -= item.price;
                console.log("Bought one of " + item.name);
                
                // Decrement quantity by one from seller. If zero, remove.
                item.quantity -= 1;
                if (item.quantity == 0) {
                    this.items = this.items.filter(i => i !== item);
                }

                this.display();
                Crafty("DinarIndicator").updateDisplay();                
            } else {
                console.log("Can't afford that, mate.");
            }
        } else {
            console.log("Index out of range of items");
        }       
    }
});