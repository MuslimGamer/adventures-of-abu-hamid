WALL_THICKNESS = 8;

Crafty.defineScene("topDownTraversalScene", function(planetNumber) {
    console.log("Entering planet " + planetNumber);
    var bg = Crafty.e("2D, Graphics, Image").image("assets/background.jpg");
    bg.z = -100;
    Crafty.e("Merchant").move(200, 200);

    Crafty.e("Wall").size(Game.world.width, WALL_THICKNESS); // top
    Crafty.e("Wall").size(Game.world.width, WALL_THICKNESS)
        .move(0, Game.world.height - WALL_THICKNESS); // bottom
    Crafty.e("Wall").size(WALL_THICKNESS, Game.world.height); // left
    Crafty.e("Wall").size(WALL_THICKNESS, Game.world.height)
        .move(Game.world.width - WALL_THICKNESS, 0); // right

    Crafty.e("Player").move(100, 100);      
    Crafty.e("DinarIndicator");
});