Crafty.c("DinarIndicator", {
    init: function() {
        this.requires("Text2").fontSize(config("fontSize")).textColor("white")
            .followForUi(PADDING, PADDING);
        this.z = 1000;
        this.updateDisplay();
    },

    updateDisplay: function() {
        var player = Crafty("Player");
        this.text(player.dinars + " dinars")
    }
})