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
            var price = this.priceMap[item.name];
            this.maxBarValue = price * 2;

            this.loadingBar = Crafty.e("Actor, ProgressBar")
                .attr({w: 100, h: 25, z: 100 })
                .centerOnScreen()
                .progressBar(this.maxBarValue, false, "red", "green")
                .updateBarProgress(price);
            
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
            this.loadingBar.updateBarProgress(currentBarProgress + this.maxBarValue * 0.05);
            this.updatePrice();
        }
    },

    haggleBack: function(frame, delta) {
        var now = Date.now();
        if (now - this.lastHaggleTime > 500) {
            var currentBarProgress = this.loadingBar._pbFilledFraction * this.maxBarValue;
            this.loadingBar.updateBarProgress(currentBarProgress - this.maxBarValue * 0.05);
            this.updatePrice();
            this.lastHaggleTime = Date.now();
        }
    },

    updatePrice: function() {
        var newPrice = Math.round(this.loadingBar._pbFilledFraction * this.maxBarValue);
        this.currentPrice.text(newPrice.toString());
    },

    setParentWindow: function(parentWindow) {
        this.items = parentWindow.items;
        this.priceMap = parentWindow.priceMap;
        this.favouriteItem = parentWindow.favouriteItem;
        this.updateDisplay();
    }
});