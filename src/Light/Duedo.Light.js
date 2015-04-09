/*
==============================
Duedo.Light
Author: http://www.edoardocasella.it

Notes:
##
==============================
*/

Duedo.Light = function(game) {
    this.Game == game || Duedo.Global.Games[0];
	
	this.Color = "yellow";
};



Duedo.Light.prototype._CastRays = function() {};

Duedo.Light.prototype.Update = function() {};

Duedo.Light.prototype.Draw = function() {};