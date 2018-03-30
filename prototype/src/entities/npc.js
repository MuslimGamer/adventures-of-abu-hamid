Crafty.c('NPC', {
    init: function () {
        this.requires('Actor')
            .size(64, 64)
            .color("green")
            .keyPress(Crafty.keys.SPACE, this.barter)
            .click(this.barter);
    },

    barter: function() {
        var player = Crafty('Player');
        var barterDistance = config('barterDistance');
        if (distanceBetween(this, player) <= barterDistance)
        {
            Crafty.e('BarterMenu');
        }
    }
});