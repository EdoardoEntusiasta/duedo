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
  /* Previous frame's location */
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

	this._PreviousWorldLocation = new Duedo.Vector2(0, 0);

	/*Callbacks*/
	/*
		* Mouse out from canvas
	*/
	this.OutCallback;

    /*
     * Mouse enter canvas
    */
	this.EnterCallback;

    /*
     * LeftClick callback
    */
	this.LeftCallback;

    /*
     * RightClick callback
    */
	this.RightCallback;

    /*
     * MiddleClick callback
    */
	this.MiddleCallback;

    /*
     * // Inverse callback
    */
	this.LeftUpCallback;
	this.RightUpCallback;
	this.MiddleUpCallback;

	this.Debug = false;

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


/**
 * LocationInTheWorld
 * @returns Duedo.Vector2
 */
Duedo.Mouse.prototype.LocationInTheWorld = function() {
	// TODO se zoommo il mouse non è corretto
	return this.Game.Viewport.Location.Clone().DivideScalar(this.Game.Viewport.Zoom).Add(this.Location);
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

	var cvBRect = this.Game.Renderer.Canvas.getBoundingClientRect();

	// Location in the canvas
	this.Location.X = (this.ClientLoc.X - cvBRect.left) * (this.Game.Renderer.Canvas.width / cvBRect.width);
	this.Location.Y = (this.ClientLoc.Y - cvBRect.top)  * (this.Game.Renderer.Canvas.height / cvBRect.height);

	if(this.Debug) {
		// console.log('Zoom', this.Game.Viewport.Zoom);
		console.info(`Mouse location in canvas: ${this.Location.X}, ${this.Location.Y}`);
		console.info(`Mouse location in world: ${this.WorldLocation.X}, ${this.WorldLocation.Y}`);
		if(this.WorldLocation.X > this.Game.World.Bounds.Width || this.WorldLocation.Y + this.Game.Viewport.View.Location.Y > this.Game.World.Bounds.Height ) {
			console.error('Warning: mouse location outside of world bounds')
		}
	}
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
		
		this.LastLocation.Copy(this.Location);

		this._PreviousWorldLocation = new Duedo.Vector2(
			(this.LastLocation.X / this.Game.Viewport.Zoom + this.Game.Viewport.View.Location.X) / Duedo.Conf.PixelsInMeter,
			(this.LastLocation.Y / this.Game.Viewport.Zoom + this.Game.Viewport.View.Location.Y) / Duedo.Conf.PixelsInMeter
		)
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
 * The comparison is made in meters relatively to the canvas
*/
Duedo.Mouse.prototype.Intersects = function(object) {

	if(Duedo.Utils.IsNull(object)) {
		return false;
	}

	// Get location relative to the canvas
	const cvBRect = this.Game.Renderer.Canvas.getBoundingClientRect();
	const LocationToCompare =  new Duedo.Vector2(
		(this.ClientLoc.X - cvBRect.left) * (this.Game.Renderer.Canvas.width / cvBRect.width),
		(this.ClientLoc.Y - cvBRect.top)  * (this.Game.Renderer.Canvas.height / cvBRect.height)
	);

	if(!object.FixedToViewport) {
		// Objects in the world are affected by zoom
		LocationToCompare.DivideScalar(this.Game.Viewport.Zoom);
	}

	if(object["Contains"]) //! DA FIXARE IN BASE A PIXEL PER METERS - ANCHE NEL CASO FIXED TO VIEWPORT
	    return object.Contains(LocationToCompare.X, LocationToCompare.Y);

	if(!object.FixedToViewport) {
		objLoc = object.Location.Clone()
			// bring anchor on top left
			.Subtract(new Duedo.Vector2(object.Width * object.Anchor.X, object.Height * object.Anchor.Y))
			// make it relative to the canvas
			.Subtract(this.Game.Viewport.View.GetAsVector())
	} else {
		objLoc = object.ViewportOffset.Clone()
			.Subtract(new Duedo.Vector2(object.Width * object.Anchor.X, object.Height * object.Anchor.Y))
	}

	LocationToCompare.DivideScalar(Duedo.Conf.PixelsInMeter); // convert coords to meters

	if(
		LocationToCompare.X >= objLoc.X
		&& LocationToCompare.X <= objLoc.X + object.Width
		&& LocationToCompare.Y >= objLoc.Y
		&& LocationToCompare.Y <= objLoc.Y + object.Height
    )
    {
        return true;
    }

    return false;
};



/**
 * Check if the mouse intersects the object or any of its children connected to it
 * @param {*} object 
 * @returns 
 */
Duedo.Mouse.prototype.IntersectsRecursive = function(object) {
	if(this.Intersects(object)) {
		return true;
	} else {
		if(object.ChildrenList.HasChildren()) {
			for(let i = 0; i <= object.ChildrenList.Length; i++) {
				return this.IntersectsRecursive(object.ChildrenList.List[i]);
			}
		} else {
			return false;
		}
	}
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



/**
 * World location
 * unit: meters
 */
Object.defineProperty(Duedo.Mouse.prototype, "WorldLocation", {

	get: function() {
		return new Duedo.Vector2(
			(this.Location.X / this.Game.Viewport.Zoom + this.Game.Viewport.View.Location.X) / Duedo.Conf.PixelsInMeter,
			(this.Location.Y / this.Game.Viewport.Zoom + this.Game.Viewport.View.Location.Y) / Duedo.Conf.PixelsInMeter
		);
	}

});



/**
 * Previous world location
 * unit: meters
 */
Object.defineProperty(Duedo.Mouse.prototype, "PreviousWorldLocation", {

	get: function() {
		return this._PreviousWorldLocation.Clone();
	}

});


