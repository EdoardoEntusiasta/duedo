/*
==============================
Duedo.TilemapLayer
Author: http://www.edoardocasella.it
==============================
*/
Duedo.TilemapLayer = function(game, image) {

	this.Game = game || Duedo.Global.Games[0];
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
Duedo.TilemapLayer.prototype.FormatLayer = function(s) {

	this.Tiles = s;
	this.Width = 120;
	this.Height = 120;
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

	//Is layer visible
	this.Renderable = (this.Game.Viewport.Intersects(
        new Duedo.Rectangle(
            this.Location.Clone(),
            this.Width, 
            this.Height)
    ) && this.Alpha > 0);

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

		if(l instanceof Array) {
			for(var x in l)
			{
				ctx.fillStyle = "white";
				ctx.rect(this.Location.X + 55 * x, this.Location.Y + 55 * i, 50, 50);
				ctx.fill();
				console.log("aa");
			}
		}
	}

	ctx.restore();

};