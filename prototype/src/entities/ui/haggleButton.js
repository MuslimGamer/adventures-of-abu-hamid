Crafty.c('HaggleButton', {
    init: function() {
        this.parentWindow = Crafty("MerchantListWindow");

        this.requires("Actor, Text2")        
            .color("white")
            .size(150, 32)
            .move(this.parentWindow.x + 200, this.parentWindow.y + this.parentWindow.h)
            .onClick(function() {
                Crafty.e('HaggleWindow').setParentWindow(this.parentWindow);
            });
        
        this.text("Haggle");
    }
});