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
	this._init(x, y, layer, width, height, image, body);
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

	if(image)
		this.Graphical = new Duedo.Image(this.Game, image);
	else throw "Duedo.Tile: needs a buffered image";

	this.Width  = width  || 0;
	this.Height = height || 0;

	this.Location.X = x || 0;
	this.Location.Y = y || 0;

	this.Layer = layer || 0;

	this.Graphical.Location.X = this.Layer.Location.X + x;
	this.Graphical.Location.Y = this.Layer.Location.Y + y;
	this.Graphical.Width  = width;
	this.Graphical.Height = height;

	/*Is physic*/
	if(body instanceof Duedo.Body) {
		this._UseBody(body);
	}

	//**PERCHÈ???
	this.Graphical.Scale.SetBoth(1);
};


/*
 * UseBody
 * private
*/
Duedo.Tile.prototype._UseBody = function(body) {

	this.Graphical.EnablePhysics = true;
	this.Graphical.Body = body;
	this.Graphical.Body.Shape = this.Game.PhysicsEngine.RectangleBody(this.Graphical.Location, this.Width, this.Height);
	this.Graphical.Body.Owner = this.Graphical;
	console.log(this.Graphical.Body);
	this.Game.PhysicsEngine.AddBody(this.Graphical.Body);
	
};


/*
 * PreUpdate
*/
Duedo.Tile.prototype.PreUpdate = function(dt) {};

/*
 * Update
*/
Duedo.Tile.prototype.Update = function(dt) {};

/*
 * PostUpdate
*/
Duedo.Tile.prototype.PostUpdate = function(dt) {
	this.Graphical.PostUpdate(dt);
};

/*
 * ContainsPoint
*/
Duedo.Tile.prototype.ContainsPoint = function(x, y) {

	 return !(x < this.worldX || y < this.worldY || x > this.right || y > this.bottom);

};
