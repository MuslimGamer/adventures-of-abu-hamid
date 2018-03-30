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

        Game.start();
    },

    start: function () {
        Crafty.e("Player").followWithCamera();
    }
};

window.addEventListener('load', Game.titleScreen);
