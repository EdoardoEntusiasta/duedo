/*
==============================
Duedo.Tilemap
Author: http://www.edoardocasella.it
==============================
*/

Duedo.Tilemap = function(game, image, tilewidth, tileheight) {
	Duedo.GraphicObject.call(this);
    this.Game = game || Duedo.Global.Games[0];
    this.Image = null;
	this.Layers = [];
	this.InUse = true;

	/*Single tile dimension*/
	this.TileWidth;
	this.TileHeigh;
	
	this._init(image, tilewidth, tileheight);

};


/*Inherit GraphicObject*/
Duedo.Tilemap.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Tilemap.prototype.constructor = Duedo.Tilemap;


/*
 * _init
*/
Duedo.Tilemap.prototype._init = function(i, tilewidth, tileheight) {

	/*Se deve essere generata da una immagine*/
	if(i instanceof Image)
	{
		this.Image = i;
	}

	/*Tile dimension*/
	this.TileWidth  = tilewidth   || 50;
	this.TileHeight = tileheight  || 50;

	return this;

};




Duedo.Tilemap.prototype.PreUpdate = function(dt) {
	for(var i in this.Layers) {
		this.Layers[i].PreUpdate(dt);
	}
};
Duedo.Tilemap.prototype.Update = function(dt) {
	for(var i in this.Layers) {
		this.Layers[i].Update(dt);
	}
};
Duedo.Tilemap.prototype.PostUpdate = function(dt) {
	for(var i in this.Layers) {
		this.Layers[i].PostUpdate(dt);
	}
};


/*
 * CreateLayer
 * create a layer by specifing an array
*/
Duedo.Tilemap.prototype.CreateLayer = function(data, x, y, z) {

	//New layer
	var layer = new Duedo.TilemapLayer(this.Game, this, this.Image);
	
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
	for(var i in this.Layers) {
		this.Layers[i].Draw(ctx);
	}
};