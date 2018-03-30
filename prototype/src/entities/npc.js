Crafty.c('NPC', {
    init: function () {
        var self = this;
        function barter() { self.barter(); }

        this.requires('Actor')
            .size(64, 64)
            .color("green")
            .keyPress(Crafty.keys.SPACE, barter)
            .click(barter);
        
        var barterDistance = config('barterDistance');

        // polygons are made by passing pairs of x,y coordinates as points, preferably in clockwise order.
        var barterRangePolygon = new Crafty.polygon(
            -barterDistance, -barterDistance, 
            barterDistance, -barterDistance,
            barterDistance, barterDistance,
            -barterDistance, barterDistance
        );

        this.barterRange = Crafty.e('2D, Collision');
        this.barterRange.collision(barterRangePolygon);
    },

    barter: function() {
        if (this.barterRange.intersect(Crafty('Player'))) {
            Crafty.e('BarterMenu');
        }
    }
});