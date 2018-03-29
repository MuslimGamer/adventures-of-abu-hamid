Game = {
    view: {
        // full-screen
        width: window.innerWidth,
        height: window.innerHeight
    },

    titleScreen: function () {
        Crafty.init(Game.view.width, Game.view.height);
        Crafty.background('black');

        Game.start();
    },

    start: function () {
        
    }
};

window.addEventListener('load', Game.titleScreen);
