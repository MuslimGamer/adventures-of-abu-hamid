const PADDING = 8;

Crafty.c("Player", {
    init: function() {
        this.requires("Actor")
            .size(64, 64)
            .color("white")
            .controllable()
            .followWithCamera();

        this.inventory = [];
        this.dinars = 100;

        this.inventoryText = Crafty.e("Text2").fontSize(config("fontSize") / 2)
            .followForUi(PADDING, PADDING).text(this.dinars + ".dinars");
        
        this.inventoryText.z = 1000;

        this.keyPress(Crafty.keys.I, function() {
            Crafty.e("ItemListWindow").setItems(this.inventory);
        })
    }
});