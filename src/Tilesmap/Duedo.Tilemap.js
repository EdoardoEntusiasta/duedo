/*
==============================
Duedo.Tilemap
Author: http://www.edoardocasella.it
==============================
*/

Duedo.Tilemap = function(game, image) {

    this.Game = game || Duedo.Global.Games[0];
    this.Image = null;
	this.Layers = [];

	this._init(image);

};


/*
 * _init
*/
Duedo.Tilemap.prototype._init = function(i) {

	if(i instanceof Image)
	{
		this.Image = i;
	}

	return this;

};


/*
 * CreateLayer
 * create a layer by specifing an array
*/
Duedo.Tilemap.prototype.CreateLayer = function(data, x, y, z) {

	//New layer
	var layer = new Duedo.TilemapLayer(this.Game, this.Image);
	
	//Layer plane
	layer.Z = z || 0;
	layer.Location.X = x;
	layer.Location.Y = y;
	layer.FormatLayer(data);

	this.Layers.push(layer);

};


/*
 * JoinGame
*/
Duedo.Tilemap.prototype.JoinGame = function() {

	for(var i in this.Layers)
 	{
		this.Game.Add(this.Layers[i]);	 	
 	}

 	this.Game.Add(this);

};