/*
==============================
Duedo.Bucket
Author: http://www.edoardocasella.it
==============================
*/

Duedo.Bucket = function(gameContext) {
	Duedo.GraphicObject.call(this);
	this.Game = gameContext || Duedo.Global.Games[0];

	this.Cursor;

	this._init();
};


/*Inherit graphic object*/
Duedo.Bucket.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Bucket.prototype.constructor = Duedo.Bucket;



/*
 * _init
*/
Duedo.Bucket.prototype._init = function() {
	this._super();

	this.Children = [];
	return this;
};


/*
 * PreUpdate
*/
Duedo.Bucket.prototype.PreUpdate = function() {

};


/*
 * Update
*/
Duedo.Bucket.prototype.Update = function() {

};


/*
 * PostUpdate
*/
Duedo.Bucket.prototype.PostUpdate = function() {

};


/*
 * SetBackground
*/
Duedo.Bucket.prototype.SetBackground = function() {

};


/*
 * Add
*/
Duedo.Bucket.prototype.Add = function(child) {

	if (child.Parent !== this)
    {
    	/*
        if (this.enableBody)
        {
            this.game.physics.enable(child, this.physicsBodyType);
        }
		*/

        this.AddChild(child);

        child.Z = this.Children.length;

        if (this.Cursor === null)
        {
            this.Cursor = child;
        }
    }

    return child;

};


/*
 * Remove
*/
Duedo.Bucket.prototype.Remove = function(child) {};


/*
 * RemoveBetween
*/
Duedo.Bucket.prototype.RemoveBetween = function(child, a, b) {

};