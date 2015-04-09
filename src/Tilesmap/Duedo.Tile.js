/*
==============================
Duedo.Tile
Author: http://www.edoardocasella.it
==============================
*/



Duedo.Tile = function(x, y, layer, width, height, image) {
	Duedo.GraphicObject.call(this);

	/*Tile parent layer*/
	this.Layer;
	this.Texture;

	this._init(x, y, layer, width, height, image);
};


/*Inherit GraphicObject*/
Duedo.Tile.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Tile.prototype.constructor = Duedo.Tile;



/*
 * _init
 * @private
*/
Duedo.Tile.prototype._init = function(x, y, layer, width, height, image) {
	this._super();

	this.Dimension.Width  = width || 0;
	this.Dimension.Height = height || 0;

	this.Location.X = x || 0;
	this.Location.Y = y || 0;

	this.Layer = layer || 0;
	this.Texture = image;

};



Duedo.Tile.prototype.ContainsPoint = function(x, y) {

	 return !(x < this.worldX || y < this.worldY || x > this.right || y > this.bottom);

};
