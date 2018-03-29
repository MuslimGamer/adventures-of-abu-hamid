Crafty.c("Player", {
    init: function() {
        this.requires("Actor");
        this.size(64, 64).color("white").controllable();
    }
})