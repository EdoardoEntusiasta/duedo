
/*
==============================
Duedo.Entity
Author: http://www.edoardocasella.it

//!! QUANDO QUESTO VIENE RIMOSSO DALL'ENGINE DEVE ESSERE RIMOSSA ANCHE LA SUA SPRITESHEET
==============================
*/


Duedo.Entity = function ( gameContext, sprite ) { 
	Duedo.GraphicObject.call(this);

	this.Game = gameContext || null;
	this._Id = Duedo.NextId();
	
	this.Sprite;

	this._init(sprite);

};


/*Inherit GraphicObject*/
Duedo.Entity.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Entity.prototype.constructor = Duedo.Entity;


/*
 * Init
 * private
*/
Duedo.Entity.prototype._init = function(sprite) {

	if(Duedo.Null(this.Game)) 
	{
		throw "Entity err: needs game context";
	}

	if(!Duedo.Null(sprite)) 
	{
		this.Sprite = sprite;
	}

	return this;
};



/*
 * Generate
 * Add this entity to the game
*/
Duedo.Entity.prototype.Generate = function() {
	
	this.Game.Add(this);

	if(!Duedo.Null(this.Sprite)) 
	{
		this.Game.Add(this.Sprite);
	}

	return this;

};


/*
 * KillSprite
 * remove sprite and body from the game
*/
Duedo.Entity.prototype.Kill = function() {

	if(!Duedo.Null(this.Sprite)) 
	{
		this.Sprite.InUse = false;
		
		if(this.Sprite.Body)
		{
			this.Game.PhysicsEngine.World.DestroyBody(this.Body);
		}
	}

};


/*
 * AddBody
 * add a body to the entity's sprite
*/
Duedo.Entity.prototype.AddBody = function(body) {

	if(!Duedo.Null(this.Sprite)) 
	{
		this.Sprite.Body = body;
	}

	return this;

};


/*
 * Update
 * Must/can be overwritten
*/
Duedo.Entity.prototype.Update     = function() {};
Duedo.Entity.prototype.PreUpdate  = function() {};
Duedo.Entity.prototype.PostUpdate = function() {};

/*
 * Draw
 * Must/can be overwritten
*/
Duedo.Entity.prototype.Draw     = function() {};


/*
 * Entity ID
*/
Object.defineProperty(Duedo.Entity.prototype, "Id", {

	get: function() {
		return this._Id;
	}

});



/*
 * Entity Body
*/
Object.defineProperty(Duedo.Entity.prototype, "Body", {

	get: function() {

		if(!Duedo.Null(this.Sprite)) 
		{
			return this.Sprite.Body;
		}
		
	}

});