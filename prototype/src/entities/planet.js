PLANET_COLOURS = ['#844', '#888', '#088', '#08F', '#0F0'];

Crafty.c("Planet", {
    init: function() {
        var randomColour = PLANET_COLOURS[Math.floor(Math.random() * PLANET_COLOURS.length)];        
        this.requires("Actor, Text2").size(64, 64).color(randomColour);
        this.onClick(function() {
            Crafty.enterScene("topDownTraversalScene", this.planetNumber);
        })     
    },

    initialize: function(planetNumber) {
        this.planetNumber = planetNumber;
        this.text("Planet " + this.planetNumber);
    }
});