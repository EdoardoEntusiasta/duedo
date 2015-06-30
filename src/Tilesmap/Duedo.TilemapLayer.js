/*
==============================
Duedo.TilemapLayer
Author: http://www.edoardocasella.it
==============================
*/
Duedo.TilemapLayer = function(game, map, image) {

	this.Game = game || Duedo.Global.Games[0];
	this.Map = map || typeof undefined;
	this.Image = image;
	this.Z = 0;
	this.Location = new Duedo.Vector2(0, 0);
	this.Tiles = [];
	this.Renderable = true;

	this.Alpha = 1;
	this.Width = null;
	this.Height = null;
};


/*
 * FormatLayer
 * @public
*/
Duedo.TilemapLayer.prototype.FormatLayer = function(data) {

	for(var i in data) 
	{
		var t = data[i]; //single tile
		
		/*Is solid?*/
		if(!t[3]) 
			t[3] = false;

		this.Tiles.push(new Duedo.Tile(this.Game, t[0], t[1], this, this.Map.TileWidth, this.Map.TileHeight, t[2], t[3]));
	}

	this.ComputeWidth().ComputeHeight();
};


/*
 * ComputeWidth
*/
Duedo.TilemapLayer.prototype.ComputeWidth = function() {
	
	var max = 0;

	for(var i in this.Tiles)
	{
		/*TODO*/
		if(this.Tiles[i].Location.X + this.Tiles[i].Width > max) {
			max = this.Tiles[i].Location.X + this.Tiles[i].Width;
		}
	}

	this.Width = max;

	return this;
};

/*
 * ComputeHeight
*/
Duedo.TilemapLayer.prototype.ComputeHeight = function() {

	var max = 0;

	for(var i in this.Tiles)
	{
		/*TODO*/
		if(this.Tiles[i].Location.Y + this.Tiles[i].Height > max) {
			max = ((this.Location.Y - this.Tiles[i].Location.Y) + this.Tiles[i].Height);
			console.log((this.Tiles[i].Location.Y + this.Tiles[i].Height) + "--" + this.Location.Y);
		}
	}

	this.Height = max;
	console.log(this.Height);
	return this;
};


/*
 * PreUpdate
 * @public
*/
Duedo.TilemapLayer.prototype.PreUpdate = function(dt) {};


/*
 * Update
 * @public
*/
Duedo.TilemapLayer.prototype.Update = function(dt) {};


/*
 * PostUpdate
 * @public
*/
Duedo.TilemapLayer.prototype.PostUpdate = function(dt) {

	for(var i in this.Tiles) {
		this.Tiles[i].PostUpdate(dt);
	}

	//Is layer visible
	this.Renderable = (this.Game.Viewport.Intersects(
        new Duedo.Rectangle(
            this.Location.Clone(),
            this.Width, 
            this.Height)
    ) && this.Alpha > 0);
this.Renderable = true;
};


/*
 * Draw
 * @public
*/
Duedo.TilemapLayer.prototype.Draw = function(ctx) {
	
	if(!this.Renderable) return;

	ctx.save();
	for(var i in this.Tiles) 
	{
		var l = this.Tiles[i];

		if(l instanceof Duedo.Tile) 
		{		
			l.Graphical.Draw(ctx);
		}
	}

	ctx.restore();

};