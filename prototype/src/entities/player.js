const PADDING = 8;

var inventory = [];
var dinars = 0;

Crafty.c("Player", {
    init: function() {
        this.requires("Actor")
            .size(64, 64)
            .color("white")
            .controllable(config('playerSpeed'))
            .followWithCamera();

        this.inventory = inventory;
        this.collideWith("Wall").collideWith("Merchant");

        this.onKeyPress(Crafty.keys.I, function() {
            Crafty.e("InventoryListWindow").setItems(this.inventory);
        })
    }
});