/*
==============================
Duedo.Tilemap
Author: http://www.edoardocasella.it
==============================
*/

Duedo.Tilemap = function(game, image) {
	Duedo.GraphicObject.call(this);
    this.Game = game || Duedo.Global.Games[0];
    this.Image = null;
	this.Layers = [];
	this.InUse = true;
	this._init(image);

};


/*Inherit GraphicObject*/
Duedo.Tilemap.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Tilemap.prototype.constructor = Duedo.Tilemap;


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




Duedo.Tilemap.prototype.PreUpdate = function() {
};
Duedo.Tilemap.prototype.Update = function() {
};
Duedo.Tilemap.prototype.PostUpdate = function() {
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
 	this.Game.Add(this);
};



Duedo.Tilemap.prototype.Draw = function(ctx) {
	console.log("draw");
	for(var i in this.Layers) {
		this.Layers[i].Draw(ctx);
	}
};