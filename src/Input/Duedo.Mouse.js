/*
==========================================
Duedo.Mouse
Author: http://www.edoardocasella.it
Inspired by: Phaser.js input manager by Richard Davey

Notes:
Mouse input handler
==========================================
*/


/*
 * MouseButton
 * A single button
*/
Duedo.MouseButton = function() {
	this.Down = false;
	this.HeldTime = 0;
};



/*
 * Mouse
*/
Duedo.Mouse = function(gameContext, InputManager) {
    this.Game = gameContext || Duedo.Global.Games[0];
	this.Manager = InputManager || null;

	this.Enabled;
	this.PreventDefault;

	/*Pointer location inside the client*/
	this.ClientLoc;
	/*Pointer location inside the canvas*/
	this.Location;
    /**/
	this.LastLocation;
	/*Pointer location relative to the whole html document*/
	this.PageLoc;

	//DownRate
	this.DownRate = 0.5;
	this._LastDownTime;

	/*Down button: can be: LEFT, RIGHT OR MIDDLE*/
	this.ButtonLeft;
	this.ButtonRight;
	this.ButtonMiddle;

	/*Used for mouse location history recording*/
	this._NextHistoryPush = 0;
	this._PHistory = [];

	/*Callbacks*/
	this.OutCallback;
	this.EnterCallback;
	
	this.LeftCallback;
	this.RightCallback;
	this.MiddleCallback;

	this.LeftUpCallback;
	this.RightUpCallback;
	this.MiddleUpCallback;
	
	//DoubleClickInterval
	this.DoubleClickInterval = 0.5;

	/*(bool) Is this mouse dragging something?*/
	this._Dragging;

	this._init();
};



/*Duedo.Mouse events*/
Duedo.Mouse.prototype._MouseDownEvent;
Duedo.Mouse.prototype._MouseUpEvent;
Duedo.Mouse.prototype._MouseOutEvent;
Duedo.Mouse.prototype._MouseOverEvent;
Duedo.Mouse.prototype._MouseMoveEvent;


/*Mouse buttons - constant*/
Duedo.Mouse.LEFT_BUTTON   = 1;
Duedo.Mouse.MIDDLE_BUTTON = 2;
Duedo.Mouse.RIGHT_BUTTON  = 3;


/*
 FIX:: Scroll della finestra influenza locazione mouse
*/


/*
 * _Init
 * @private
*/
Duedo.Mouse.prototype._init = function() {

	this.Enabled        = true;
	this.PreventDefault = true;

	/*Init pointers*/
	this.Location  = new Duedo.Vector2(-1, -1);
	this.ClientLoc = new Duedo.Vector2(-1, -1);
	this.PageLoc   = new Duedo.Vector2(-1, -1);
	this.LastLocation = new Duedo.Vector2(-1, -1);

	/*Buttons*/
	this.ButtonLeft   = new Duedo.MouseButton();
	this.ButtonRight  = new Duedo.MouseButton();
	this.ButtonMiddle = new Duedo.MouseButton();
	this.Dragging     = false;

	var _self = this;


	/*STD Events - can be custom*/
	this._MouseDownEvent = function (event) {
        return _self._ProcessMouseDown(event);
    };

    this._MouseUpEvent = function (event) {
        return _self._ProcessMouseUp(event);
    };

    this._MouseOutEvent = function (event) {
        return _self._ProcessMouseOut(event);
    };

    this._MouseOverEvent = function (event) {
        return _self._ProcessMouseOver(event);
    };

    this._MouseMoveEvent = function (event) {
        return _self._ProcessMouseMove(event);
    };


    //Connect
    this.Connect(this.Game.Renderer.Canvas);

};



/*
 * Connect
 * @public
 * Connect mouse listener to the specified target element (ex. canvas)
*/
Duedo.Mouse.prototype.Connect = function(target) {

	if(Duedo.Utils.IsNull(target))
		target = this.Game.Renderer.Canvas;

	/*true: -> use capture*/
	this.Game.Renderer.Canvas.addEventListener("mouseover", this._MouseOverEvent, true);
	this.Game.Renderer.Canvas.addEventListener("mouseout",  this._MouseOutEvent,  true);
	this.Game.Renderer.Canvas.addEventListener("mouseup",   this._MouseUpEvent,   true);
	this.Game.Renderer.Canvas.addEventListener("mousedown", this._MouseDownEvent, true);
	this.Game.Renderer.Canvas.addEventListener("mousemove", this._MouseMoveEvent, true);

};



/*
 * _ProcessMouseDown
 * @private
*/
Duedo.Mouse.prototype._ProcessMouseDown = function(event) {

	if(!this.Enabled)
		return;

	if(this.PreventDefault)
		this._PreventDefault(event);

	//Call mouse input callbacks
	switch(event.which)
	{
		case Duedo.Mouse.LEFT_BUTTON:   
			this.ButtonLeft.Down   = true; 
			this.ButtonLeft.HeldTime = 0;  
			if(!Duedo.Utils.IsNull(this.LeftCallback))   
				this.LeftCallback.call(this);   
			break;

		case Duedo.Mouse.RIGHT_BUTTON:  
			this.ButtonRight.Down  = true;   
			this.ButtonRight.HeldTime = 0;
			if(!Duedo.Utils.IsNull(this.RightCallback))  
				this.RightCallback.call(this);  
			break;

		case Duedo.Mouse.MIDDLE_BUTTON: 
			this.ButtonMiddle.Down = true;
			this.ButtonMiddle.HeldTime = 0;   
			if(!Duedo.Utils.IsNull(this.MiddleCallback))
			 	this.MiddleCallback.call(this); 
			 break;
	}
	
};



/*
 * _ProcessMouseUp
 * @private
*/
Duedo.Mouse.prototype._ProcessMouseUp = function(event) {

	if(!this.Enabled)
		return;

	if(this.PreventDefault)
		this._PreventDefault(event);

	//Call mouse input callbacks
	switch(event.which)
	{
		case Duedo.Mouse.LEFT_BUTTON:   this.ButtonLeft.Down   = false;   if(!Duedo.Utils.IsNull(this.LeftUpCallback))   this.LeftUpCallback.call(this); break;
		case Duedo.Mouse.RIGHT_BUTTON:  this.ButtonRight.Down  = false;   if(!Duedo.Utils.IsNull(this.RightUpCallback))  this.RightUpCallback.call(this); break;
		case Duedo.Mouse.MIDDLE_BUTTON: this.ButtonMiddle.Down = false;   if(!Duedo.Utils.IsNull(this.MiddleUpCallback)) this.MiddleUpCallback.call(this); break;
	}

};



/*
 * _ProcessMouseOver
 * @private
*/
Duedo.Mouse.prototype._ProcessMouseOver = function(event) {

	if(!this.Enabled)
		return;

	if(this.PreventDefault)
		this._PreventDefault(event);

	if(this.EnterCallback)
		this.EnterCallback.call(this);

};



/*
 * _ProcessMouseOut
 * @private
*/
Duedo.Mouse.prototype._ProcessMouseOut = function(event) {
	
	if(!this.Enabled)
		return;

	if(this.PreventDefault)
		this._PreventDefault(event);

	if(this.OutCallback)
		this.OutCallback.call(this);

};


/*
 * _ProcessMouseMove
 * @private
*/
Duedo.Mouse.prototype._ProcessMouseMove = function(event) {
	
	if(!this.Enabled)
		return;

	if(this.PreventDefault)
	    this._PreventDefault(event);

	/*Client loc*/
	this.ClientLoc.X = event.clientX;
	this.ClientLoc.Y = event.clientY;

	/*Pageloc*/
	this.PageLoc.X   = event.pageX;
	this.PageLoc.Y   = event.pageY; 

	/*Location inside the canvas*/
	var cvBRect = this.Game.Renderer.Canvas.getBoundingClientRect();

	this.Location.X = (this.ClientLoc.X - cvBRect.left) * (this.Game.Renderer.Canvas.width / cvBRect.width);
	this.Location.Y = (this.ClientLoc.Y - cvBRect.top)  * (this.Game.Renderer.Canvas.height / cvBRect.height);


};


/*
 * Update
 * @public
*/
Duedo.Mouse.prototype.Update = function(deltaT) {

	if(!this.Enabled)
		return;

	/*Record mouse movement history*/
	if(this.Manager.RecordMouseHistory && (this.Game.ElapsedTime > this._NextHistoryPush))
	{
		this._NextHistoryPush = this.Manager.HistoryPushRate + this.Game.ElapsedTime;

		this._PHistory.push(new Duedo.Vector2(this.Location.X, this.Location.Y));

		if(this._PHistory.length >= this.Manager.HistoryRecordLimit)
			this._PHistory.shift();
	} 


	/*Update held time*/
	if(this.ButtonLeft.Down)
		this.ButtonLeft.HeldTime += deltaT;
	if(this.ButtonMiddle.Down)
		this.ButtonMiddle.HeldTime += deltaT;
	if(this.ButtonRight.Down)
		this.ButtonRight.HeldTime += deltaT;
    

};


/*
 * PostUpdate
 * @public
*/
Duedo.Mouse.prototype.PostUpdate = function (dt) {

    this.LastLocation.X = this.Location.X;
    this.LastLocation.Y = this.Location.Y;

};



/*
 * GetMouseHistory
 * @public
*/
Duedo.Mouse.prototype.GetMouseHistory = function() {
	return this._PHistory;
};


/*
 * ClearMouseHisotry
 * @public
*/
Duedo.Mouse.prototype.ClearMouseHistory = function() {
	return this._PHistory = [];
};


/*
 * IsDown
 * @public
 * Return true if buttonInt is down: Duedo.Mouse.LEFT/RIGHT/MIDDLE_BUTTON
*/
Duedo.Mouse.prototype.IsDown = function(buttonInt) {


	switch(buttonInt) {
		case Duedo.Mouse.LEFT_BUTTON:   down = this.ButtonLeft.Down;   break;
		case Duedo.Mouse.RIGHT_BUTTON:  down = this.ButtonRight.Down;  break;
		case Duedo.Mouse.MIDDLE_BUTTON: down = this.ButtonMiddle.Down; break;
	}

	return down;

};



/*
 * _PreventDefault
 * @private
*/
Duedo.Mouse.prototype._PreventDefault = function(event) {

	if(event.preventDefault)
		event.preventDefault();
	else
		event.returnValue = false;

};



/*
 * Intersect
 * Check for intersection between mouse pointer and object
*/
Duedo.Mouse.prototype.Intersects = function(object) {

	if(Duedo.Utils.IsNull(object))
		return false;

	if (object["Contains"])
	    return object.Contains(this.Location.X + this.Game.Viewport.View.Location.X, this.Location.Y + this.Game.Viewport.View.Location.Y);

	var objLoc = object.Location.Clone().Subtract( this.Game.Viewport.View.GetAsVector() );

	if (this.Location.X >= objLoc.X && this.Location.X <= objLoc.X + object.Width
        && this.Location.Y >= objLoc.Y && this.Location.Y <= objLoc.Y + object.Height)
    {
        return true;
    }


    return false;
};



/*
 * Disconnect
 * @public
 * Disconnect the mouse from his target element
*/
Duedo.Mouse.prototype.Disconnect = function() {

	this.Game.Renderer.Canvas.removeEventListener("mouseover", this._MouseOverEvent, true);
	this.Game.Renderer.Canvas.removeEventListener("mouseout",  this._MouseOutEvent,  true);
	this.Game.Renderer.Canvas.removeEventListener("mouseup",   this._MouseUpEvent,   true);
	this.Game.Renderer.Canvas.removeEventListener("mousedown", this._MouseDownEvent, true);
	this.Game.Renderer.Canvas.removeEventListener("mousemove", this._MouseMoveEvent, true);

};



/*
 * Null
 * @public
 * Hard-release button
*/
Duedo.Mouse.prototype.Null = function(buttonInt) {
	switch(buttonInt) {
		case Duedo.Mouse.LEFT_BUTTON:   return this.ButtonLeft.Down = false;
		case Duedo.Mouse.RIGHT_BUTTON:  return this.ButtonRight.Down = false;
		case Duedo.Mouse.MIDDLE_BUTTON: return this.ButtonMiddle.Down = false;
		default: 
			this.ButtonLeft.Down   = false;
			this.ButtonRight.Down  = false;
			this.ButtonMiddle.Down = false;
		break;
	}
};



/*
 * Draw
 * @public
 * Draw custom mouse pointer
*/
Duedo.Mouse.prototype.Draw = function() {

	if(this.Manager.MouseGPointer)
		this.Game.Renderer.Context.drawImage(this.Manager.MouseGPointer, 
			this.Location.X + this.Game.Viewport.View.X, 
			this.Location.Y + this.Game.Viewport.View.Y, 
			this.Manager.MouseGPointerDim.Width, this.Manager.MouseGPointerDim.Height);

};


/*
 * Dragging
*/
Object.defineProperty(Duedo.Mouse.prototype, "Dragging", {
    get: function () {
        return this._Dragging;
    },
    set: function (bool) {
        return this._Dragging = bool;
    }
});


/*
 * Return true if the mouse is moving during this frame
*/
Object.defineProperty(Duedo.Mouse.prototype, "IsMoving", {

    get: function () {
        return !Duedo.Vector2.Compare(this.Location, this.LastLocation);
    }

});


Object.defineProperty(Duedo.Mouse.prototype, "Width", {

    get: function () {
        return 1;
    }

});


Object.defineProperty(Duedo.Mouse.prototype, "Height", {

    get: function () {
        return 1;
    }

});