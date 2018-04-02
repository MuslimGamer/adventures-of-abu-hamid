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

        this.inventoryText = Crafty.e("Text2").fontSize(config("fontSize")).textColor("white")
            .followForUi(PADDING, PADDING).text(this.dinars + " dinars");
        
        this.inventoryText.z = 1000;

        this.onKeyPress(Crafty.keys.I, function() {
            Crafty.e("InventoryListWindow").setItems(this.inventory);
        })
    }
});