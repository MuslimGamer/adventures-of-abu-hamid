Crafty.c('Merchant', {
    init: function () {
        this.requires('Actor')
            .size(64, 64)
            .color("green")
            .onKeyPress(Crafty.keys.SPACE, this.barter)
            .onClick(this.barter);
        
        var numGoods = config("numGoodsPerMerchant");
        // Random but biased towards the first item(s?) heavily. Oh well.
        // https://stackoverflow.com/questions/19269545/how-to-get-n-no-elements-randomly-from-an-array

        var allItemNames = config('goods');
        this.priceMap = {};
        allItemNames.forEach(itemName => {
            this.priceMap[itemName] = Math.round(randomBetween(config("minPrice"), config("maxPrice")));
        });

        var itemNames = config("goods").sort(() => .5 - Math.random()).slice(0, numGoods);
        this.items = [];
        for (var i = 0; i < itemNames.length; i++) {
            var randomQuantity = randomBetween(config("minQuantity"), config("maxQuantity"));
            var item = new Item(itemNames[i], randomQuantity);
            this.items.push(item);
        }

        if (config('features').merchantsHaveFavouriteItems) {
            var itemName = itemNames[Math.floor(Math.random()*itemNames.length)];
            this.priceMap[itemName] = randomBetween(config("minPrice"), config("maxPrice")) + config("maxPrice");
            this.favouriteItem = {name: itemName};
        }
    },

    barter: function() {
        var player = Crafty('Player');
        var barterDistance = config('barterDistance');
        if (distanceBetween(this, player) <= barterDistance)
        {
            var merchantWindow = Crafty.e('MerchantListWindow');
            if (config('features').merchantsHaveFavouriteItems) {
                merchantWindow.setFavouriteItem(this.favouriteItem);
            }
            
            merchantWindow.setBuyingAndSellingItems(this.items, inventory, this.priceMap);
        }
    }
});