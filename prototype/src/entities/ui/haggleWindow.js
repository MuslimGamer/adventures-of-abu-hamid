const BASE_HAGGLE_RATE = 0.01;

Crafty.c('HaggleWindow', {
    init: function () {
        this.requires('InventoryListWindow');

        this.onClick(function(data) {
            var localY = data.clientY - Crafty.viewport.y - this.y;
            var selectedItemIndex = Math.floor(localY / config("fontSize") / CLICK_OFFSET_MULTIPLIER);            
            this.haggle(selectedItemIndex);            
        });
        this.lastHaggleTime = 0;

        this.onKeyPress(Crafty.keys.ESC, function() {
            this.restoreParentWindow();
        });
    },

    haggle: function(itemIndex) {
        if (!this.alreadyHaggling && itemIndex >= 0 && itemIndex < this.items.length) {
            this.alreadyHaggling = true;
            this.itemIndex = itemIndex;
            this.item = this.items[itemIndex];
            this.originalPrice = this.priceMap[this.item.name];
            this.maxBarValue = this.originalPrice * 2;

            var flipBar, emptyColour, filledColour;
            if (this.parentWindow.buySellToggle.isPlayerBuying) {
                emptyColour = "green";
                filledColour = "red";
            } else {
                emptyColour = "red";
                filledColour = "green";
            }

            this.loadingBar = Crafty.e("Actor, ProgressBar")
                .attr({w: 100, h: 25, z: 100 })
                .centerOnScreen()
                .progressBar(this.maxBarValue, flipBar, emptyColour, filledColour)
                .updateBarProgress(this.originalPrice);
            
            this.currentPrice = Crafty.e("Actor, Text2")
                .size(0, 0)
                .move(this.loadingBar.x + this.loadingBar.width() / 2, this.loadingBar.y + 50);

            this.updatePrice();        
            this.bind("KeyUp", this.haggleOn);
            this.bind('EnterFrame', this.haggleBack);
            this.haggleStartTime = Date.now();
        }
    },

    haggleOn: function(e) {
        if (e.key == Crafty.keys.H) {
            var currentBarProgress = this.loadingBar._pbFilledFraction * this.maxBarValue;
            var haggleDirection = this.parentWindow.buySellToggle.isPlayerBuying ? -1 : 1;
            var haggleRate = this.getHaggleRate(haggleDirection);
            this.loadingBar.updateBarProgress(currentBarProgress + this.maxBarValue * haggleRate * haggleDirection);
            this.updatePrice();
        }
    },

    haggleBack: function(frame, delta) {
        var now = Date.now();
        if (now - this.haggleStartTime > 5000) {
            var currentPrice = Math.round(this.loadingBar._pbFilledFraction * this.maxBarValue);
            console.log("haggled one " + this.item.name + " for " + currentPrice);
            this.priceMap[this.item.name] = currentPrice;
            this.parentWindow.tradeItem(this.itemIndex);
            this.priceMap[this.item.name] = this.originalPrice;
            this.restoreParentWindow();
        } else if (now - this.lastHaggleTime > 150) {
            var currentBarProgress = this.loadingBar._pbFilledFraction * this.maxBarValue;
            var haggleDirection = this.parentWindow.buySellToggle.isPlayerBuying ? 1 : -1;
            var haggleRate = this.getHaggleRate(haggleDirection);
            this.loadingBar.updateBarProgress(currentBarProgress + this.maxBarValue * haggleRate * haggleDirection);
            this.updatePrice();
            this.lastHaggleTime = Date.now();
        }
    },

    getHaggleRate: function(haggleDirection) {
        var fraction = this.loadingBar._pbFilledFraction;
        if (haggleDirection == 1) {
            fraction = 1 - fraction;
        }
        return fraction * BASE_HAGGLE_RATE
    },
 
    updatePrice: function() {
        var newPrice = Math.round(this.loadingBar._pbFilledFraction * this.maxBarValue);
        this.currentPrice.text(newPrice.toString());
    },

    setParentWindow: function(parentWindow) {
        this.parentWindow = parentWindow;
        this.items = parentWindow.items;
        this.priceMap = parentWindow.priceMap;
        this.favouriteItem = parentWindow.favouriteItem;
        this.updateDisplay();
    },

    restoreParentWindow: function() {
        delete this.loadingBar.destroy();
        delete this.currentPrice.destroy();
        this.destroy();
        var newParentWindow = this.parentWindow.clone();
        newParentWindow.merchantItems = this.parentWindow.merchantItems;
        newParentWindow.playerInventory = this.parentWindow.playerInventory;
        newParentWindow.priceMap = this.parentWindow.priceMap;
        newParentWindow.favouriteItem = this.parentWindow.favouriteItem;
        newParentWindow.items = this.parentWindow.items;
        newParentWindow.buySellToggle.isPlayerBuying = this.parentWindow.buySellToggle.isPlayerBuying;
    }
});