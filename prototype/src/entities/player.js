Crafty.c("Player", {
    init: function() {
        this.requires("Actor")
            .size(64, 64)
            .color("white")
            .controllable()
            .followWithCamera();
        
        this.inventory = [];
    }
});