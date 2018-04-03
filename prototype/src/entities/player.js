const PADDING = 8;

Crafty.c("Player", {
    init: function() {
        this.requires("Actor")
            .size(64, 64)
            .color("white")
            .controllable()
            .followWithCamera();

        this.inventory = [];
        this.dinars = config("startingDinars");
        this.collideWith("Wall");

        this.onKeyPress(Crafty.keys.I, function() {
            Crafty.e("InventoryListWindow").setItems(this.inventory);
        })
    }
});