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
	this.FrameIndex;
	this.Active;


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
	this.Name 		= sname || "sequence_" + this.Parent.SequencesLength;

};