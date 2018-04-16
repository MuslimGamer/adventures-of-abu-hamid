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
                .attr({ x: 150, y : 140, w: 100, h: 25, z: 100 })
                .centerOnScreen()
                .progressBar(this.maxBarValue, false, "red", "green")
                .updateBarProgress(price);
            
            this.bind("KeyUp", this.haggleOn);
            this.bind('EnterFrame', this.haggleBack);
        }
    },

    haggleOn: function(e) {
        if (e.key == Crafty.keys.H) {
            var currentBarProgress = this.loadingBar._pbFilledFraction * this.maxBarValue;
            this.loadingBar.updateBarProgress(currentBarProgress + this.maxBarValue * 0.05);
        }
    },

    haggleBack: function(frame, delta) {
        var now = Date.now();
        if (now - this.lastHaggleTime > 500) {
            var currentBarProgress = this.loadingBar._pbFilledFraction * this.maxBarValue;
            this.loadingBar.updateBarProgress(currentBarProgress - this.maxBarValue * 0.05);
            this.lastHaggleTime = Date.now();
        }
    },

    setParentWindow: function(parentWindow) {
        this.items = parentWindow.items;
        this.priceMap = parentWindow.priceMap;
        this.favouriteItem = parentWindow.favouriteItem;
        this.updateDisplay();
    }
});