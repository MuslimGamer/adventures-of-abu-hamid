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

    start: function () {
        Crafty.init(Game.view.width, Game.view.height);
        Crafty.background('grey');
        
        loadImages(["assets/background.jpg"], function() {
            Crafty.enterScene("topDownTraversalScene");
            // Crafty.enterScene("hyperspaceScene");
        });
    }
};

window.addEventListener('load', Game.start);
