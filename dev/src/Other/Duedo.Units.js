
/*
==============================
Duedo.Units
Author: http://www.edoardocasella.it

Notes:
Pixels to meters conversion
Meters to pixels conversion
based on Duedo.Conf.PixelsInMeter
==============================
*/


Duedo.Units = function() { };

/*
 * Pixels to meters
*/
Duedo.Units.P2M = function(px) {
	return px / Duedo.Conf.PixelsInMeter;
};

/*
 * Meters to pixels
*/
Duedo.Units.M2P = function(m) {
	return m * Duedo.Conf.PixelsInMeter;
};

Duedo.Units.DegToRadians = function(degrees) {
	return degrees * Math.PI / 180;
};


DUnits = Duedo.Units;
window.DToPixels = DUnits.M2P;