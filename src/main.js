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

    }
};

window.addEventListener('load', Game.titleScreen);
