WALL_THICKNESS = 8;

Game = {
    view: {
        // NOT full-screen
        // width: window.innerWidth,
        // height: window.innerHeight
        width: 960,
        height: 540
    },

    world: {
        width: 1920,
        height: 1080
    },

    titleScreen: function () {
        Crafty.init(Game.view.width, Game.view.height);
        Crafty.background('grey');
        
        loadImages(["assets/background.jpg"], function() {
            Game.start();
        });
    },

    start: function () {
        var bg = Crafty.e("2D, Graphics, Image").image("assets/background.jpg");
        bg.z = -100;
        Crafty.e("Merchant").move(200, 200);

        this.addBoundingWalls();
        Crafty.e("Player").move(100, 100);      
        Crafty.e("DinarIndicator");
    },

    addBoundingWalls: function() {
        Crafty.e("Wall").size(Game.world.width, WALL_THICKNESS); // top
        Crafty.e("Wall").size(Game.world.width, WALL_THICKNESS)
            .move(0, Game.world.height - WALL_THICKNESS); // bottom
        Crafty.e("Wall").size(WALL_THICKNESS, Game.world.height); // left
        Crafty.e("Wall").size(WALL_THICKNESS, Game.world.height)
            .move(Game.world.width - WALL_THICKNESS, 0); // right
    }
};

window.addEventListener('load', Game.titleScreen);
