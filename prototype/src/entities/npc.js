Crafty.c('NPC', {
    init: function () {
        this.requires('Actor')
            .size(64, 64)
            .color("green")
            .keyPress(Crafty.keys.SPACE, this.barter)
            .click(this.barter);
        
        var barterDistance = config('barterDistance');
        var centerx = this.x + this.width() / 2;
        var centery = this.y + this.height() / 2;

        // polygons are made by passing pairs of x,y coordinates as points, preferably in clockwise order.
        var barterRangePolygon = new Crafty.polygon(
            -barterDistance + centerx, -barterDistance + centery, 
            barterDistance + centerx, -barterDistance + centery,
            barterDistance + centerx, barterDistance + centery,
            -barterDistance + centerx, barterDistance + centery
        );

        this.barterRange = Crafty.e('2D, Collision, SolidHitBox');
        this.barterRange.collision(barterRangePolygon);
    },

    barter: function() {
        if (this.barterRange.intersect(Crafty('Player'))) {
            Crafty.e('BarterMenu');
        }
    }
});