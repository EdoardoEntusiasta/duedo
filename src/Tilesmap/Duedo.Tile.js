/*
==============================
Duedo.Tile
Author: http://www.edoardocasella.it
==============================
*/



Duedo.Tile = function(game, x, y, layer, width, height, image, body) {
	Duedo.GraphicObject.call(this);
	this.Game = game || typeof undefined;
	/*Tile parent layer*/
	this.Layer;
	this.Graphical;
	this._init(x, y, layer, width, height, image);
};


/*Inherit GraphicObject*/
Duedo.Tile.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Tile.prototype.constructor = Duedo.Tile;



/*
 * _init
 * @private
*/
Duedo.Tile.prototype._init = function(x, y, layer, width, height, image, body) {
	this._super();

	this.Width  = width  || 0;
	this.Height = height || 0;

	this.Location.X = x || 0;
	this.Location.Y = y || 0;

	this.Layer = layer || 0;

	this.Graphical = new Duedo.Image(this.Game, image);
	this.Graphical.Location.X = this.Layer.Location.X + x;
	this.Graphical.Location.Y = this.Layer.Location.Y + y;
	this.Graphical.Width  = width;
	this.Graphical.Height = height;
	
	//**PERCHÈ???
	this.Graphical.Scale.SetBoth(1)
};



Duedo.Tile.prototype.ContainsPoint = function(x, y) {

	 return !(x < this.worldX || y < this.worldY || x > this.right || y > this.bottom);

};
