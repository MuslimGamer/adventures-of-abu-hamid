Crafty.c('InventoryListWindow', {
    // Singleton by force. Like, brute force...
    init: function () {
        var self = this;
        Crafty.forEach("InventoryListWindow", function(window) {
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

        this.fontSize(config("fontSize"));
    },

    setItems: function(items) {
        this.items = items;
        this.updateDisplay();
        this.bind("KeyUp", this.buy);
        return this;        
    },

    updateDisplay: function() {
        var displayText = "";
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            displayText = "{0}{1}) {2} x{3} &nbsp;&nbsp;({4} dinars each)<br />"
                .format(displayText, (i + 1), item.name, item.quantity, item.price);
        }
        
        this.text(displayText);
    }
});