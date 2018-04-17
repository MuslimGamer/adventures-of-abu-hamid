const BASE_HAGGLE_RATE = 0.05;

Crafty.c('HaggleWindow', {
    init: function () {
        this.requires('InventoryListWindow');

        this.onClick(function(data) {
            var localY = data.clientY - Crafty.viewport.y - this.y;
            var selectedItemIndex = Math.floor(localY / config("fontSize") / CLICK_OFFSET_MULTIPLIER);            
            this.haggle(selectedItemIndex);            
        });
        this.lastHaggleTime = 0;
    },

    haggle: function(itemIndex) {
        if (!this.alreadyHaggling && itemIndex >= 0 && itemIndex < this.items.length) {
            this.alreadyHaggling = true;
            var item = this.items[itemIndex];
            this.originalPrice = this.priceMap[item.name];
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
        if (now - this.lastHaggleTime > 500) {
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
    }
});