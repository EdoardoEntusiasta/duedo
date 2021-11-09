/*
==============================
Duedo.SSequence
Author: http://www.edoardocasella.it

Notes:
SpriteSheet frames sequence

Bindable triggers:
#ended: when sequence routine is finished
#repeatrepached: was repeated maximum times
==============================
*/

Duedo.SSequence = function(gameContext, name) {
	Duedo.GraphicObject.call(this);
	this.Game = gameContext || Duedo.Global.Games[0];
	this.Type = Duedo.SSEQUENCE;
	
	this.Frames;
	this.SpriteSource;
	this.FrameIndex;
	this.Active;
	this.Rate = 1;
	this.Repeat = Infinity;
	this.Reverse = false;
	this._Expired = false;
	this._init(name);

};


/*Inherit GraphicObject*/
Duedo.SSequence.prototype = Object.create(Duedo.Object.prototype);
Duedo.SSequence.prototype.constructor = Duedo.SSequence;



/*
 * _init
 * @public
*/
Duedo.SSequence.prototype._init = function(sname) {

	this.Frames     = [];
	this.FrameIndex = 0;
	this.Active     = true;
	this.Name 		  = sname || "sequence_" + this.Parent.SequencesLength;

};

/*
 * Reset
 * @public
*/
Duedo.SSequence.prototype.Reset = function() {
	this.FrameIndex = 0;
	return this;
};

/*
 * Activate
 * @public
*/
Duedo.SSequence.prototype.Activate = function() {
	this.Active = true;
	return this;
};


/*
 * Expired
 * @public
*/
Duedo.SSequence.prototype.SetExpired = function(val) {
	return this._Expired = val;
};

/*
 * Expired
 * @public
*/
Duedo.SSequence.prototype.IsExpired = function() {
	return this._Expired;
};