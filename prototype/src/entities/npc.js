Crafty.c('NPC', {
    init: function () {
        this.requires('Actor')
            .size(64, 64)
            .color("green")
            .keyPress(Crafty.keys.SPACE, this.barter)
            .click(this.barter);
        
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
            // TODO: create menu
        }
    }
});