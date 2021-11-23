/*
==============================
Duedo.Viewport
Author: http://www.edoardocasella.it
Thanks to: Phaser.js

 * Viewport bindable events
   -update
   -targetlocked
 *

 ! To modify Camera Location use: mygame.Viewport.View <-

 To drag:
 press the support key while dragging
 this.DragSupportKey

 About zooming
 https://stackoverflow.com/questions/2916081/zoom-in-on-a-point-using-scale-and-translate

 ? To prevent scaling on mobile
 <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0,       user-scalable=0' >
==============================
*/

Duedo.Viewport = function ( gameContext, ViewWidth, ViewHeight ) {
	Duedo.GraphicObject.call(this);
	this.Game = gameContext || Duedo.Global.Games[0];
	this.Type = Duedo.VIEWPORT;
	this._Debug = false;

	/*
	To modify width and height values see defined property Width and Height
	that are at the bottom of this page
	*/
	this.View;

	this.Translation;

	this.Target;

	this.Deadzone;

	this.AtLimitX = false;
	this.AtLimitY = false;

	this.Offset = new Duedo.Vector2(null, null);
	this.Bounds;

	this._Edge;

	// Zoom
	this._Zoom = 1;
	this._Zoomed = false;
	this.ZoomMax = 5;
	this.ZoomMin = Duedo.Conf.MinimumZoom;
	
	this.OriginalView = {
		Width: null,
		Height: null
	}

	this._Effects = [];

	/*Dragging properties*/
	this.DragScale = 0.5;
	this.Slide = false;
	this._DragAcceleration = new Duedo.Vector2(0, 0);
	this._Velocity = new Duedo.Vector2(0, 0);
	// this.DragMouseOnly = 
	this.DragSupportKey = Duedo.Keyboard.SHIFT;
	this.DragPreventFollow = false;

	/*Initialize*/
	return this._init(ViewWidth, ViewHeight);

};

/*Inherit GraphicObject*/
Duedo.Viewport.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Viewport.prototype.constructor = Duedo.Viewport;



/*"following styles"*/
Duedo.Viewport.FOLLOW_XY = 1; //default
Duedo.Viewport.FOLLOW_X  = 2;
Duedo.Viewport.FOLLOW_Y  = 3;



/*
 * _init
 * @private
*/
Duedo.Viewport.prototype._init = function ( ViewWidth, ViewHeight) {
	this._super();

	if( Duedo.Utils.IsNull(this.Game.World) )
	{
		throw "Duedo.Viewport._init: cannot instantite viewport.";
	}

	/*Translation vector*/
	this.Translation = new Duedo.Vector2(0, 0);

	/*Viewport location/dimension*/
	this.View = new Duedo.Rectangle(new Duedo.Vector2(0, 0), ViewWidth / Duedo.Conf.PixelsInMeter, ViewHeight / Duedo.Conf.PixelsInMeter);

	this.OriginalView = {
		Width: ViewWidth / Duedo.Conf.PixelsInMeter,
		Height: ViewHeight / Duedo.Conf.PixelsInMeter,
		X: this.View.Location.X,
		Y: this.View.Location.Y
	}

	/*Reference to the world bounds*/
	this.Bounds            = new Duedo.Rectangle();
	this.Bounds.Location.X = 0;
	this.Bounds.Location.Y = 0;
	this.Bounds.Width      = this.Game.World.Bounds.Width;
	this.Bounds.Height     = this.Game.World.Bounds.Height;

	/*Locations vectors2*/
	this.Location     = this.View.Location;
	this.LastLocation = new Duedo.Vector2(0, 0);
	
	return this;
};



/**
 * Update effects
 * TODO preUpdate effects?
 * @private
 */
Duedo.Viewport.prototype._UpdateEffects = function(arg, method = 'Update') {
	for(let i = this._Effects.length - 1; i >= 0; i--) {
		if(!this._Effects[i][method](arg)) {
			this._Effects.splice(i, 1);
		}
	}
}



/**
 * Effect
 * Apply an effect to the viewport
 * @param {*} magnitude 
 */
Duedo.Viewport.prototype.Effect = function(effectName, options) {
	this._Effects.push( new Duedo[`ViewportEffect${effectName}`](this.Game, this, options));
}



/*
 * Follow
 * @public
 * Follow a target
 * @target: target must be an instance of GraphicObject or at least an object having a location vector and a dimension
*/
Duedo.Viewport.prototype.Follow = function ( object, style ) {

	if(Duedo.Utils.IsNull(object) || Duedo.Utils.IsNull(object["Location"]))
		return null;

	this.Target = object;
	
	switch (style)
	{
		case Duedo.Viewport.FOLLOW_X:
			//TODO:
			break;

		case Duedo.Viewport.FOLLOW_Y:
			//TODO:
			break;

		case Duedo.Viewport.FOLLOW_XY:
		default:
			/*Set deadzone - both axis following */
			var w = this.View.Width / 8;
			var h = this.View.Height / 3;
			this.Deadzone = new Duedo.Rectangle( new Duedo.Vector2( (this.View.Width - w) / 2, (this.View.Height - h) / 2 - h * 0.25), w, h);
			break;
	}

	// TODO CHECK ! (testa con parallasse attivo)
	this.LastLocation = this.Target.Location.Clone();

	//TargetLocked event
	this._CallTriggers("targetlocked");

	return this;
};


/**
 * Reset viewport with new dimension
 * @param {*} width 
 * @param {*} height 
 */
Duedo.Viewport.prototype.Reset = function(width, height) {
	this._init(width, height);
}



/*
 * PreUpdate
 * @public
*/
Duedo.Viewport.prototype.PreUpdate = function() {

   if(this._Draggable && !this.Target)
   {
		this._FavorsDragging();
   }

};



/*
 * _UpdateTargetDependacy
 * @private
*/
Duedo.Viewport.prototype._UpdateTargetDependancy = function() {

	if(!this.Target)
		return;

	if(this._Dragging && this.DragPreventFollow)
		return;
	
	/*Are we following a target?*/
	this.UpdateTranslation();

};



/*
 * Main update
 * @public
*/
Duedo.Viewport.prototype.Update = function ( deltaT ) {

	// Calculate camera size based on zoom
	this.View.Width = this.OriginalView.Width / this._Zoom;
	this.View.Height = this.OriginalView.Height / this._Zoom;

	this._UpdateTargetDependancy();

	/*Update animations*/
	this.UpdateAnimations( deltaT );
	// View react animations
	this.View.UpdateAnimations( deltaT );

	/*Check camera collision*/
	if( this.Bounds )
	{
		this.UpdateBoundsCollision();
	}

	this._UpdateOffset();

	/*Update translation*/
	this.Location = this.View.Location.Clone();


	if (!Duedo.Vector2.Compare(this.LastLocation, this.Location))
	{
		this.Translation = this.Location.Clone().Subtract(this.LastLocation);
	}
	else
	{
		this.Translation.MultiplyScalar(0);
	}

	this._UpdateEffects(deltaT);

	if(this._Zoomed) {
		this._Zoomed = false;
	}

	return this;

};



/**
 * _UpdateOffset
 * @returns 
 */
Duedo.Viewport.prototype._UpdateOffset = function() {

	let FinalOffset = new Duedo.Vector2(0, 0);

	if(this._Zoomed && !this.Game.IsMobile && !this.Target) {
		// Zoom toward the mouse	
		const CameraTranslation = this.Game.InputManager.Mouse.PreviousWorldLocation
			.Clone()
			.Subtract(this.Game.InputManager.Mouse.WorldLocation);
		
		const FinalPosition = this.View.Location.Clone().Add(CameraTranslation);
		
		this.SetPosition(
			FinalPosition.X,
			FinalPosition.Y
		)

		this._Velocity.Reset();

	}

	FinalOffset.Copy(this.View.Location);

	this.Offset.X = FinalOffset.X;
	this.Offset.Y = FinalOffset.Y;

	return this;
}



/*
 * PostUpdate
*/
Duedo.Viewport.prototype.PostUpdate = function(deltaT) {
   this.LastLocation = this.Location.Clone();
};



/*
 * UpdateTranslation
 * @private
*/
Duedo.Viewport.prototype.UpdateTranslation = function () {

	//Pixel to meters location
	this.mLocation = this.Target.Location.Clone(); // location is always scaled by meters per pixel

	/*...follow target - there is a Deadzone */
	if( this.Deadzone )
	{
		this._Edge = this.mLocation.X - this.Deadzone.Location.X;

		if (this.View.Location.X > this._Edge)
		{
			this.View.Location.X = this._Edge;
		}

		this._Edge = this.mLocation.X/* + this.Target.Width */- this.Deadzone.Location.X - this.Deadzone.Width;

		if (this.View.Location.X < this._Edge)
		{
			this.View.Location.X = this._Edge;
		}

		this._Edge = this.mLocation.Y - this.Deadzone.Location.Y;

		if (this.View.Location.Y > this._Edge)
		{
			this.View.Location.Y = this._Edge;
		}

		this._Edge = this.mLocation.Y/* + this.Target.Height*/ - this.Deadzone.Location.Y - this.Deadzone.Height;

		if (this.View.Location.Y < this._Edge)
		{
			this.View.Location.Y = this._Edge;
		}
	}
	else
	{
		this.FocusOnXY( this.mLocation.X, this.mLocation.Y );
	}

	return this;

};




/*
 * _FavorsDragging
*/
Duedo.Viewport.prototype._FavorsDragging = function() {

	var mouse = this.Game.InputManager.Mouse;

	if(!this._DragMouseLastLocation)
		if(!Duedo.Vector2.Compare(this._DragMouseLastLocation, mouse.Location))
			this._DragMouseLastLocation = mouse.Location.Clone();
	
	//Should be pressed both LEFT_BUTTON and at least a Duedo key {ex: Duedo.Keyboard.CONTROL}
	if(
		(!mouse.IsDown(Duedo.Mouse.LEFT_BUTTON) || !this.Game.InputManager.Keyboard.KeyState(this.DragSupportKey)) && this.DragSupportKey
		|| !mouse.IsDown(Duedo.Mouse.LEFT_BUTTON))
	{
		if(this._Dragging) {
			document.body.style.cursor = 'auto';
		}
		this._Dragging = false;
		this._DragMouseLastLocation = mouse.Location.Clone();
	}

	var DeltaMouse = mouse.Location.Clone().Subtract(this._DragMouseLastLocation).DivideScalar(Duedo.Conf.PixelsInMeter)/*.MultiplyScalar(20)*/;

	if(DeltaMouse.Magnitude() != 0) {
		document.body.style.cursor = 'grab';
		this._Dragging = true;
	}
	
	DeltaMouse.DivideScalar(this.Zoom);

	var DirVector = DeltaMouse.Clone();

	const deltaSlideMinimumThreshold = 0.1;
	const cameraMass = 5;

	if(this.Slide && DeltaMouse.Magnitude() >= deltaSlideMinimumThreshold ||  this._Velocity.Magnitude()) {

		if(!this.Game.Status.DraggingObject && !this.Game.Status.HookedObject) {
			// Reset velocity if mouse down
			if(mouse.IsDown(Duedo.Mouse.LEFT_BUTTON)) {
				this._Velocity.MultiplyScalar(0);
			}

			// Slide only for
			this._DragAcceleration = DeltaMouse.DivideScalar(1).MultiplyScalar(-1);
		}
		
		const relFriction = this._Velocity.Clone()
			.MultiplyScalar(-1)
			.Normalize()
			.MultiplyScalar( /*coefficient of friction*/ 0.1 * /*normal force (perpendicular to object)*/ 1);
		
		this._DragAcceleration.Add(relFriction.DivideScalar(cameraMass));

		this._Velocity.Add(this._DragAcceleration).Limit(8.5);
		this.View.Location.Add(this._Velocity);

		if(this._Velocity.Magnitude() < 0.01) {
			this._Velocity.Reset();
		}

		// Reset acceleration
		this._DragAcceleration.MultiplyScalar(0);
	} else {
		if(!this.Game.Status.DraggingObject && !this.Game.Status.HookedObject) {
			DirVector.MultiplyScalar(this.DragScale).Negate();
			this.View.Location.X += DirVector.X;
			this.View.Location.Y += DirVector.Y;
		}
	}

	this._DragMouseLastLocation = mouse.Location.Clone();

};





/*
 * UpdateBoundsCollision
 * @private
*/
Duedo.Viewport.prototype.UpdateBoundsCollision = function () {
	
	/*...check bounds collision*/
	this.AtLimitX = false;
	this.AtLimitY = false;
	
	//X
	if( this.View.Location.X <= this.Bounds.Location.X )
	{
		this.AtLimitX = true;
		this.View.Location.X = this.Bounds.Location.X;
	}
	
	if( this.View.Location.X + this.View.Width >= this.Bounds.Location.X + this.Bounds.Width )
	{
		this.AtLimitX = true;
		this.View.Location.X = (this.Bounds.Location.X + this.Bounds.Width) - this.View.Width;
	}

	//Y
	if (this.View.Location.Y <= this.Bounds.Location.Y)
	{
		this.AtLimitY = true;
		this.View.Location.Y = this.Bounds.Location.Y;
	}

	if (this.View.Location.Y + this.View.Height >= this.Bounds.Location.Y + this.Bounds.Height)
	{
		this.AtLimitY = true;
		this.View.Location.Y = (this.Bounds.Location.Y + this.Bounds.Height) - this.View.Height;
	}

	return this;

};



/*
 * FocusOnXY
 * @public
*/
Duedo.Viewport.prototype.FocusOnXY = function (x, y) {
	this.SetPosition( Math.round(x - this.View.HalfWidth ), Math.round( y - this.View.HalfHeight ) );
	return this;
};




/*
 * SetPosition
 * @public
*/
Duedo.Viewport.prototype.SetPosition = function (x, y) {

	this.View.Location.X = x;
	this.View.Location.Y = y;

	if( this.Bounds )
	{
		this.UpdateBoundsCollision();
	}


	return this;

};



/*
 * Intersects
 * @public
 * Check object intersection
*/
Duedo.Viewport.prototype.Intersects = function ( DuedoRect ) {
	/*
		Rectangle intersection
	*/
	return this.View.Intersects(DuedoRect)
};




/*
 * Attach
 * @public
 * Make an object fixed to viewport
 * @gobject: the graphic object
 * @offsetVetor: (Duedo.Vector2) the camera offset
*/
Duedo.Viewport.prototype.Attach = function ( gobj, offsetVector ) {

	if( !Duedo.Utils.IsNull(gobj) )
	{
		gobj.FixedToViewport = true;
		gobj.ViewportOffset  = offsetVector;
	}

	return gobject;

};



/*
 * Detach
 * @public
 * Free an object from the camera. The gobj will no longer follow
 * the camera translation
*/
Duedo.Viewport.prototype.Detach = function ( gobj ) {

	if( !Duedo.Utils.IsNull(gobj) )
	{
		gobj.FixedToViewport = false;
	}

	return gobj;
};



/*
 * Zoom
 * @public
 * Manage Zoom property
*/
Object.defineProperty(Duedo.Viewport.prototype, "Zoom", {

	set: function ( value ) {
		
		this._Zoom = value;
		
		// Allow only 1 (Rendrer.this.Context.scale(Zoom))
		if(this._Zoom < this.ZoomMin) {
			this._Zoom = this.ZoomMin;
		}

		if(this._Zoom > this.ZoomMax) {
			this._Zoom = this.ZoomMax;
		}

		this.Game._Message('zoomed');

		this._Zoomed = true;

		// Recalculate Deadzone
		if(this.Target) {
			this.Follow(this.Target)
		}
	},

	get: function () {
		return this._Zoom;
	}

});


/*
 * Bottom
 * @public
 * Return bottom point in meters
*/
Object.defineProperty(Duedo.Viewport.prototype, "Bottom", {

	get: function () {
		return this.View.Height;
	}

});


/*
 * Width
 * @public
 * Manage Width property
*/
Object.defineProperty(Duedo.Viewport.prototype, "Width", {

	set: function ( value ) {
		this.View.Width = value;
		//TODO fix MODIFICA SCALE
	},

	get: function () {
		return this.View.Width;
	}

});



/*
 * Height
 * @public
 * Manage Height property
*/
Object.defineProperty(Duedo.Viewport.prototype, "Height", {

	set: function (value) {
		this.View.Height = value;
		//TODO fix MODIFICA SCALE
	},

	get: function () {
		return this.View.Height;
	}

});



/*
 * HalfWidth
 * @public
*/
Object.defineProperty(Duedo.Viewport.prototype, "HalfWidth", {

	get: function () {
		return this.View.Width / 2;
	}

});



/*
 * HalfHeight
 * @public
*/
Object.defineProperty(Duedo.Viewport.prototype, "HalfHeight", {
	get: function () {
		return this.View.Height / 2;
	}

});


/*
 * LocationInMeters
 * @public
 * Return location in meters
*/
Object.defineProperty(Duedo.Viewport.prototype, "LocationInMeters", {

	get: function () {
		return new Duedo.Vector2(this.View.Location.X * Duedo.Conf.PixelsInMeter, this.View.Location.Y * Duedo.Conf.PixelsInMeter)
	}

});



/*
 * Center
 * @public
 * Return the viewport location center
*/
Object.defineProperty(Duedo.Viewport.prototype, "Center", {

	get: function() {
		return new Duedo.Vector2( this.View.Location.X + (this.HalfWidth), this.View.Location.Y + (this.View.HalfHeight));
	},

});



/*
 * EnableDragging
 * @public
 * Makes the viewport draggable
*/
Object.defineProperty(Duedo.Viewport.prototype, "EnableDragging", {

	get: function() {
		return this._Draggable;
	},

	set: function(value) {
		this._Draggable = value;
	}

});



/*
 * Debug
 * @public
 * If setted to true will print debug informations
*/
Object.defineProperty(Duedo.Viewport.prototype, "Debug", {

	get: function() {
		return this._Debug;
	},

	set: function(bool) {

		if(bool === true)
		{
			this._Debug = true;

			if(this._DebugText)
				return;

			/*Prepare a text object through which view the informations*/
			this._DebugText = new Duedo.Text(this.Game, "VIEWPORT-DEBUG");
			this._DebugText.FixedToViewport = true;
			this._DebugText.FontSize = 14;
			this._DebugText.Style.Fill = 'red';
			this._DebugText.Anchor.X = this._DebugText.Anchor.Y = 0;
			this._DebugText.Debug = true;
			this._DebugText.ViewportOffset.X = 5;
			this._DebugText.ViewportOffset.Y = 15;
			this._DebugText.FontWeight = "bold";
			this._DebugText.Draggable = true;

			/*Add to debug storage for updates*/
			this.Game.Add(this._DebugText);
			
		}
		else
		{
			this._Debug = false;
			if(this._DebugText)
				this._DebugText.InUse = false;
		}
	}

});




/*
 * RenderDebugInfo
 * @public
 * Render debug information about the viewport
*/
Duedo.Viewport.prototype.RenderDebugInfo = function(renderer) {

	/*Debug info text*/
	this._DebugText.Text = "VIEWPORT-DEBUG\nLocation: {X: "+this.View.Location.X.toFixed(2)+" Y: "+this.View.Location.Y.toFixed(2)+"}\nDimension: {Width: "+this.View.Width+" Height: "+this.View.Height+"}\nBounds: {Width: "+this.Bounds.Width+" Height:    "+this.Bounds.Height+"}\nTranslation: {X:"+this.Translation.X.toFixed(2)+" Y:"+this.Translation.Y.toFixed(2)+"}\nZoom:" + this.Zoom;
	this._DebugText.Draw(this.Game.Renderer.Context);

	this._DebugText.RenderOrderID = renderer.CurrentRenderOrderID++;
};
