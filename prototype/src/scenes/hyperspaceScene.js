
Crafty.defineScene("hyperspaceScene", function() {
    var bg = Crafty.e("2D, Graphics, Image").image("assets/stars.jpg");
    bg.z = -100;

    var numPlanets = config("universeSizeInPlanets");
    for (var i = 0; i < numPlanets; i++) {

        planet = Crafty.e("Planet");
        planet.initialize(i + 1);
        planet.move(
            randomBetween(0, Game.view.width - planet.width()),
            randomBetween(0, Game.view.height - planet.height())
        );
    }
});