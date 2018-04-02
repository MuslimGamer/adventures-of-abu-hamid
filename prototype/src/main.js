Game = {
    view: {
        // NOT full-screen
        // width: window.innerWidth,
        // height: window.innerHeight
        width: 960,
        height: 540
    },

    titleScreen: function () {
        Crafty.init(Game.view.width, Game.view.height);
        Crafty.background('grey');
        
        loadImages(["assets/background.jpg"], function() {
            Game.start();
        });
    },

    start: function () {
        Crafty.e("2D, Graphics, Image").image("assets/background.jpg");
        Crafty.e("Player");
        Crafty.e("DinarIndicator");
        Crafty.e("Merchant");
    }
};

window.addEventListener('load', Game.titleScreen);
