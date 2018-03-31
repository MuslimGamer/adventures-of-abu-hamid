Crafty.c('NPC', {
    init: function () {
        this.requires('Actor')
            .size(64, 64)
            .color("green")
            .keyPress(Crafty.keys.SPACE, this.barter)
            .click(this.barter);
        
        var numGoods = config("numGoodsPerMerchant");
        // Random but biased towards the first item(s?) heavily. Oh well.
        // https://stackoverflow.com/questions/19269545/how-to-get-n-no-elements-randomly-from-an-array
        this.items = config("goods").sort(() => .5 - Math.random()).slice(0, numGoods);
        this.prices = [];
        for (var i = 0; i < this.items.length; i++) {
            var randomPrice = randomBetween(config("minPrice"), config("maxPrice"));
            this.prices.push(Math.round(randomPrice));
        }
    },

    barter: function() {
        var player = Crafty('Player');
        var barterDistance = config('barterDistance');
        if (distanceBetween(this, player) <= barterDistance)
        {
            Crafty.e('ItemListWindow').setItems(this.items, this.prices);
        }
    }
});