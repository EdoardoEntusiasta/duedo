/*
==========================================
Duedo.Keyboard
Author: http://www.edoardocasella.it
Inspired by: Phaser.js input manager by Richard Davey

Notes:
Keyboard input handler
==========================================
*/


Duedo.Keyboard = function(gameContext) {
    this.Game = gameContext || Duedo.Global.Games[0];

	this.Enabled;
	this.PreventDefault = true;

	//this._Captures;
	this._Keys;
    //-UNUSED
	this.Events;

	this.Latency = 0.03;

	this._init();

};


//Constructor
Duedo.Keyboard.prototype.constructor = Duedo.Keyboard;


//Events
Duedo.Keyboard.prototype._KeyDownEvent;
Duedo.Keyboard.prototype._KeyUpEvent;



/*
 * _init
*/
Duedo.Keyboard.prototype._init = function() {

	if(!this.Game)
		return -1;

	//this._Captures = [];
	this._Keys     = [];
	this.Events   = [];

	this.Connect();

};



/*
 * Connect
 * @public
 * Start keyboard listener
*/
Duedo.Keyboard.prototype.Connect = function() {

	/*K events*/
	var self = this;

	this._KeyDownEvent = function(event) {
		self._ProcessKeyDown(event);
	};

	this._KeyUpEvent = function(event) {
		self._ProcessKeyUp(event);
	};


	//Enable keyboard handler
	this.Enabled = true;
	this.PreventDefault = false;

	/*Start listeners*/
	window.addEventListener('keydown', this._KeyDownEvent, false);
    window.addEventListener('keyup', this._KeyUpEvent, false);

};



/*
 * _ProcessKeyDown
 * @private
*/
Duedo.Keyboard.prototype._ProcessKeyDown = function(event) {
	

	this.Event = event;

	if(!this.Enabled)
		return;

	if(this.PreventDefault)
		this._PreventDefault(event);


	var key = event.keyCode || event.which;

	if (!this._Keys[key])
    {
       this._Keys[key] = new Duedo.Key(this.Game, key, this);
    }


    this._Keys[key].ProcessKeyDown();

};



/*
 * _ProcessKeyUp
 * @private
*/
Duedo.Keyboard.prototype._ProcessKeyUp = function(event) {

	this.Event = event;

	if(!this.Enabled)
		return;

	if(this.PreventDefault)
		this._PreventDefault(event);

	var key = event.keyCode || event.which;

	if (!this._Keys[key])
    {
       this._Keys[key] = new Duedo.Key(this.Game, key, this);
    }

    
    this._Keys[key].ProcessKeyUp(event);
};



/*
 * _PreventDefault
 * @private
*/
Duedo.Keyboard.prototype._PreventDefault = function(event) {

	if(event.preventDefault)
		event.preventDefault();
	else
		event.returnValue = false;

};


/*
@todo
Duedo.Keyboard.prototype.BindKey = function (e, k, c, n) {
    
    if(Duedo.Utils.IsNull(this.Events[k]))
    {
        this.Events[k] = new Array();
    }

    if (Duedo.Utils.IsNull(this.Events[k][e]))
    {
        this.Events[k][e] = new Array();
    }
    

    this.Events[k][e].push({
        name: n ? n : "func" + this.Events[k][e].length,
        func: c
    });
};
*/


/*
 * Update
 * @public
*/
Duedo.Keyboard.prototype.Update = function(deltaT) {

	var i = this._Keys.length;

    while (i--)
    {
        if (this._Keys[i])
        {
            this._Keys[i].Update(deltaT);
        }
    }

};



/*
 * Null
 * @public
 * Null keypress
*/
Duedo.Keyboard.prototype.Null = function(key) {

	if(!this._Keys[key])
		return null;

	this._Keys[key].Null();

};



/*
 * Disconnect
 * @public
 * Disconnect keyboard listener
*/
Duedo.Keyboard.prototype.Disconnect = function(destroy) {

	window.removeEventListener('keydown', this._KeyDownEvent);
    window.removeEventListener('keyup', this._KeyUpEvent);

    this._KeyDownEvent  = null;
    this._KeyUpEvent    = null;
    this.Enabled        = false;

    if(destroy)
    {
    	this.Destroy();
    }


    return this;
};



/*
 * Destroy
 * @public
*/
Duedo.Keyboard.prototype.Destroy = function() {

	this._Keys = [];
	//this._Captures = [];


	return this;

};


/*
 * Keystate
 * @public
*/
Duedo.Keyboard.prototype.KeyState = function(key) {

	if(!this._Keys[key])
		return false;

	return this._Keys[key].IsDown;

};



/*
 * HeldDuration
 * @public
*/
Duedo.Keyboard.prototype.HeldDuration = function(key) {

	if(!this._Keys[key])
		return false;

	if(this._Keys[key].IsDown)
	{
		return this._Keys[key].HeldTime;
	}
	else
	{
		return false;
	}

};



/*
 * HeldFor
 * @public
 * return true if duration is >= key.HeldTime
*/
Duedo.Keyboard.prototype.HeldFor = function(key, duration) {

	if(!this._Keys[key])
		return false;

	if(this._Keys[key].IsDown)
	{
		return ((this._Keys[key].HeldTime - this.Keyboard.Latency) >= duration);
	}
	else
	{
		return false;
	}

};







/*Keys*/
Duedo.Keyboard.A = "A".charCodeAt(0);
Duedo.Keyboard.B = "B".charCodeAt(0);
Duedo.Keyboard.C = "C".charCodeAt(0);
Duedo.Keyboard.D = "D".charCodeAt(0);
Duedo.Keyboard.E = "E".charCodeAt(0);
Duedo.Keyboard.F = "F".charCodeAt(0);
Duedo.Keyboard.G = "G".charCodeAt(0);
Duedo.Keyboard.H = "H".charCodeAt(0);
Duedo.Keyboard.I = "I".charCodeAt(0);
Duedo.Keyboard.J = "J".charCodeAt(0);
Duedo.Keyboard.K = "K".charCodeAt(0);
Duedo.Keyboard.L = "L".charCodeAt(0);
Duedo.Keyboard.M = "M".charCodeAt(0);
Duedo.Keyboard.N = "N".charCodeAt(0);
Duedo.Keyboard.O = "O".charCodeAt(0);
Duedo.Keyboard.P = "P".charCodeAt(0);
Duedo.Keyboard.Q = "Q".charCodeAt(0);
Duedo.Keyboard.R = "R".charCodeAt(0);
Duedo.Keyboard.S = "S".charCodeAt(0);
Duedo.Keyboard.T = "T".charCodeAt(0);
Duedo.Keyboard.U = "U".charCodeAt(0);
Duedo.Keyboard.V = "V".charCodeAt(0);
Duedo.Keyboard.W = "W".charCodeAt(0);
Duedo.Keyboard.X = "X".charCodeAt(0);
Duedo.Keyboard.Y = "Y".charCodeAt(0);
Duedo.Keyboard.Z = "Z".charCodeAt(0);
Duedo.Keyboard.ZERO = "0".charCodeAt(0);
Duedo.Keyboard.ONE = "1".charCodeAt(0);
Duedo.Keyboard.TWO = "2".charCodeAt(0);
Duedo.Keyboard.THREE = "3".charCodeAt(0);
Duedo.Keyboard.FOUR = "4".charCodeAt(0);
Duedo.Keyboard.FIVE = "5".charCodeAt(0);
Duedo.Keyboard.SIX = "6".charCodeAt(0);
Duedo.Keyboard.SEVEN = "7".charCodeAt(0);
Duedo.Keyboard.EIGHT = "8".charCodeAt(0);
Duedo.Keyboard.NINE = "9".charCodeAt(0);
Duedo.Keyboard.NUMPAD_0 = 96;
Duedo.Keyboard.NUMPAD_1 = 97;
Duedo.Keyboard.NUMPAD_2 = 98;
Duedo.Keyboard.NUMPAD_3 = 99;
Duedo.Keyboard.NUMPAD_4 = 100;
Duedo.Keyboard.NUMPAD_5 = 101;
Duedo.Keyboard.NUMPAD_6 = 102;
Duedo.Keyboard.NUMPAD_7 = 103;
Duedo.Keyboard.NUMPAD_8 = 104;
Duedo.Keyboard.NUMPAD_9 = 105;
Duedo.Keyboard.NUMPAD_MULTIPLY = 106;
Duedo.Keyboard.NUMPAD_ADD = 107;
Duedo.Keyboard.NUMPAD_ENTER = 108;
Duedo.Keyboard.NUMPAD_SUBTRACT = 109;
Duedo.Keyboard.NUMPAD_DECIMAL = 110;
Duedo.Keyboard.NUMPAD_DIVIDE = 111;
Duedo.Keyboard.F1 = 112;
Duedo.Keyboard.F2 = 113;
Duedo.Keyboard.F3 = 114;
Duedo.Keyboard.F4 = 115;
Duedo.Keyboard.F5 = 116;
Duedo.Keyboard.F6 = 117;
Duedo.Keyboard.F7 = 118;
Duedo.Keyboard.F8 = 119;
Duedo.Keyboard.F9 = 120;
Duedo.Keyboard.F10 = 121;
Duedo.Keyboard.F11 = 122;
Duedo.Keyboard.F12 = 123;
Duedo.Keyboard.F13 = 124;
Duedo.Keyboard.F14 = 125;
Duedo.Keyboard.F15 = 126;
Duedo.Keyboard.COLON = 186;
Duedo.Keyboard.EQUALS = 187;
Duedo.Keyboard.UNDERSCORE = 189;
Duedo.Keyboard.QUESTION_MARK = 191;
Duedo.Keyboard.TILDE = 192;
Duedo.Keyboard.OPEN_BRACKET = 219;
Duedo.Keyboard.BACKWARD_SLASH = 220;
Duedo.Keyboard.CLOSED_BRACKET = 221;
Duedo.Keyboard.QUOTES = 222;
Duedo.Keyboard.BACKSPACE = 8;
Duedo.Keyboard.TAB = 9;
Duedo.Keyboard.CLEAR = 12;
Duedo.Keyboard.ENTER = 13;
Duedo.Keyboard.SHIFT = 16;
Duedo.Keyboard.CONTROL = 17;
Duedo.Keyboard.ALT = 18;
Duedo.Keyboard.CAPS_LOCK = 20;
Duedo.Keyboard.ESC = 27;
Duedo.Keyboard.SPACEBAR = 32;
Duedo.Keyboard.PAGE_UP = 33;
Duedo.Keyboard.PAGE_DOWN = 34;
Duedo.Keyboard.END = 35;
Duedo.Keyboard.HOME = 36;
Duedo.Keyboard.LEFT = 37;
Duedo.Keyboard.UP = 38;
Duedo.Keyboard.RIGHT = 39;
Duedo.Keyboard.DOWN = 40;
Duedo.Keyboard.INSERT = 45;
Duedo.Keyboard.DELETE = 46;
Duedo.Keyboard.HELP = 47;
Duedo.Keyboard.NUM_LOCK = 144;
