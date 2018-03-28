me = {
    view: {
        // full-screen
        width: window.innerWidth,
        height: window.innerHeight
    },

    titleScreen: function () {
            Game.start();
    },

    start: function () {

    },

    cleanUp: function() {
        // copypaste from house of jinn
        var everything = Crafty("*");
        for (var i = 0; i < everything.length; i++) {
            Crafty(everything[i]).die();
        }
    }
};

window.addEventListener('load', Game.titleScreen);
