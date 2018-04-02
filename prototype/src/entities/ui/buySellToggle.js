Crafty.c("BuySellToggle", {
    init: function() {
        var self = this;
        this.isPlayerBuying = true;
        var parentWindow = Crafty("MerchantListWindow");

        this.requires("Actor, Text2")        
        .color("white").size(150, 32)
        .move(parentWindow.x, parentWindow.y + parentWindow.h)
        .onClick(function() {
            self.isPlayerBuying = !self.isPlayerBuying;
            self.updateDisplay();
        });

        this.updateDisplay();
    },

    updateDisplay: function() {
        this.text("Switch to " + (this.isPlayerBuying ? "selling" : "buying"));
    }
});