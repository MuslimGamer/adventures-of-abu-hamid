Crafty.c('NPC', {
    init: function () {
        this.requires('Actor')
            .size(64, 64)
            .color("green")
            .onKeyPress(Crafty.keys.SPACE, this.barter)
            .onClick(this.barter);
        
        var numGoods = config("numGoodsPerMerchant");
        // Random but biased towards the first item(s?) heavily. Oh well.
        // https://stackoverflow.com/questions/19269545/how-to-get-n-no-elements-randomly-from-an-array
        var itemNames = config("goods").sort(() => .5 - Math.random()).slice(0, numGoods);
        this.items = [];
        for (var i = 0; i < itemNames.length; i++) {
            var randomPrice = randomBetween(config("minPrice"), config("maxPrice"));
            var randomQuantity = randomBetween(config("minQuantity"), config("maxQuantity"));
            var item = new Item(itemNames[i], Math.round(randomPrice), 100);
            this.items.push(item);
        }
    },

    barter: function() {
        var player = Crafty('Player');
        var barterDistance = config('barterDistance');
        if (distanceBetween(this, player) <= barterDistance)
        {
            Crafty.e('ItemListWindow').setItems(this.items);
        }
    }
});