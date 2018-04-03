Crafty.c("BuySellToggle", {
    init: function() {
        var self = this;
        this.isPlayerBuying = true; // source of truth for whether we're buying or selling
        this.parentWindow = Crafty("MerchantListWindow");

        this.requires("Actor, Text2")        
        .color("white").size(150, 32)
        .move(this.parentWindow.x, this.parentWindow.y + this.parentWindow.h)
        .onClick(function() {
            self.isPlayerBuying = !self.isPlayerBuying;
            this.parentWindow.toggleBuyingSelling();
            self.updateDisplay();
        });

        this.text("Switch to " + (this.isPlayerBuying ? "selling" : "buying"));
    },

    updateDisplay: function() {
        this.text("Switch to " + (this.isPlayerBuying ? "selling" : "buying"));
        this.parentWindow.updateDisplay();
    }
});