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
            this.tradeItem(selectedItemIndex);            
        });

        this.buySellToggle = Crafty.e("BuySellToggle");
        this.tradeItem = this.buySellToggle.isPlayerBuying ? this.buyItem : this.sellItem;

        this.haggleButton = Crafty.e('HaggleButton');
    },

    trade: function(e) {
        var key = e.key;
        // the index number of the item to be bought
        var num = key - 48;
        this.tradeItem(num - 1);
    },

    buyItem: function(itemIndex) { 
        if (this.items != null && itemIndex >= 0 && itemIndex < this.items.length) {
            var item = this.items[itemIndex];
            var player = Crafty('Player');

            if (dinars >= item.price) {

                var copy = Object.assign({}, item);
                // If we already own it, increment our quantity by 1
                var existing = player.inventory.filter(i => i.name == item.name);
                if (existing.length == 0) {
                    copy.quantity = 1;
                    player.inventory.push(copy);
                } else {
                    existing[0].quantity += 1;
                }
                dinars -= item.price;
                console.log("Bought one of " + item.name);
                
                // Decrement quantity by one from seller. If zero, remove.
                item.quantity -= 1;
                if (item.quantity == 0) {
                    this.items = this.items.filter(i => i !== item);
                }

                this.updateDisplay();
                Crafty("DinarIndicator").updateDisplay();                
            } else {
                console.log("Can't afford that, mate.");
            }
        } else {
            console.log("Index out of range of items");
        }       
    },

    sellItem: function(itemIndex) {
        var player = Crafty('Player');
        if (player.inventory != null && itemIndex >= 0 && itemIndex < player.inventory.length) {
            var item = player.inventory[itemIndex];
            var copy = Object.assign({}, item);

            // If we already own it, increment our quantity by 1
            var existing = this.merchantItems.filter(i => i.name == item.name);
            if (existing.length == 0) {
                copy.quantity = 1;
                this.merchantItems.push(copy);
            } else {
                existing[0].quantity += 1;
            }
            dinars += item.price;
            console.log("Sold one of " + item.name);
            
            // Decrement quantity by one from seller. If zero, remove.
            item.quantity -= 1;
            if (item.quantity <= 0) {
                player.inventory = player.inventory.filter(i => i !== item);
            }

            this.updateDisplay();
            Crafty("DinarIndicator").updateDisplay();
        } else {
            console.log("Index out of range of items");
        }
    },

    tradeItem: function(itemIndex) {},

    remove: function() {
        this.buySellToggle.die();
        this.haggleButton.die();
    },

    setBuyingAndSellingItems: function(merchantItems, playerItems) {
        this.merchantItems = merchantItems;
        this.playerInventory = playerItems;
        this.toggleBuyingSelling();
        this.updateDisplay();
        this.bind("KeyUp", this.trade);
    },

    setFavouriteItem: function(favouriteItem) {
        this.favouriteItem = favouriteItem;
        return this;
    },

    toggleBuyingSelling: function() {
        this.items = this.buySellToggle.isPlayerBuying ? this.merchantItems : this.playerInventory;
        this.tradeItem = this.buySellToggle.isPlayerBuying ? this.buyItem : this.sellItem;
        this.updateDisplay();
    }
});