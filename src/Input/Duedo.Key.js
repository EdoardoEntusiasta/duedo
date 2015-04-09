/*
==========================================
Duedo.Key
Author: http://www.edoardocasella.it
Inspired by: Phaser.js input manager

Notes:
Keyboard input handler
//Bindable events/closures
@onkeyup
@onkeydown
==========================================
*/

Duedo.Key = function(gameContext, keyCode, keyboard) {
	this.Game = gameContext || Duedo.Global.Games[0];

	this.KeyCode  = keyCode || null;
	this.Keyboard = keyboard;
	this.Enabled;
	this._PendingDown;
	this.IsDown;
	this.TDown;

	this.IsUp;
	this.TUp;

	this.Repeated;
	this.HeldTime;

	this._init();
};



//Constructor
//Inherit triggerable
Duedo.Key.prototype = Object.create(Duedo.Object.prototype);
Duedo.Key.prototype.constructor = Duedo.Key;


/*
 * _init
*/
Duedo.Key.prototype._init = function() {

	this.IsDown   = false;
	this.TDown    = 0;
	this.TUp      = 0;
	this.IsUp     = false;
	this.Repeated = 0;
	this.HeldTime = 0;
	this.Enabled  = true;
	this._PendingDown = false;
};


/*
 * ProcessKeyDown
 * @public
*/
Duedo.Key.prototype.ProcessKeyDown = function() {

	if(!this.Enabled || this.IsDown)
	{
		return;
	}


	//this.IsDown = true;
	this._PendingDown = true;
	this.IsUp = false;
	this.TDown  = this.Game.ElapsedTime;

	this.HeldTime = 0;
	this.Repeated = 0;

};


/*
 * ProcessKeyUp
 * @public
*/
Duedo.Key.prototype.ProcessKeyUp = function() {

	if(!this.Enabled || this.IsUp)
	{
		return;
	}


	this.IsDown       = false;
	this._PendingDown = false;
	this.IsUp     = true;
	this.TUp      = this.Game.ElapsedTime;
    this.HeldTime = this.Game.ElapsedTime - this.TDown;

	this.HeldTime = 0;
};


/*
 * Null
 * @public
 * Force key release
*/
Duedo.Key.prototype.Null = function() {

	this.IsDown = false;
	this.IsUp = true;
	this.TUp = this.Game.ElapsedTime;
	this._PendingDown = false;
	//this.HeldTime = this.Game.ElapsedTime - this.TDown;


};


/*
 * Update
 * @public
 * Main key update
*/
Duedo.Key.prototype.Update = function(deltaT) {

	if(!this.Enabled)
		return;

	if (this._PendingDown)
	{
	    if (this.HeldTime >= this.Keyboard.Latency) {
	        this.IsDown = true;
	        this._PendingDown = false;
	    }
	}

	this.HeldTime += deltaT;

};
