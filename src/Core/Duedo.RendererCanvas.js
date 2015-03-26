/*
==============================
Duedo.CanvasRenderer
Author: http://www.edoardocasella.it
==============================
*/


Duedo.CanvasRenderer = function(renderer, canvas) {

	/*Main renderer object*/
	this.Renderer;

	/*Joinable methods*/
	this.SharedMethods = [
		"Translate",
		"ApplyTransformationMatrix",
		"Clear",
		"Draw",
		"Smoothing",
		"BlendMode",
		"Scale",
		"Save",
		"Restore"
	];

	this.SharedProperties = [
		"SmoothProperty", "SmoothingEnabled",
		"TransformationMatrix",
		"CurrentBlendMode", "BlendModesEnabled"
	];

	/*Blend mode*/
	this.CurrenBlendMode = null;
	this.BlendModesEnabled = false;

	this.TransformationMatrix = [];
	/*_initialize*/
	this._init(renderer, canvas);
};



/*
 * _init
 * @private
*/
Duedo.CanvasRenderer.prototype._init = function(renderer, canvas) {

	this.Renderer = renderer;
	if(!this.Renderer)
		throw "CanvasRenderer: null Rendererer";


	if(!Duedo.Utils.IsNull(canvas))
	{
		if(canvas.nodeName.toLowerCase() == 'canvas')
			this.Canvas = canvas;
		else
		{
			throw "Dued.Renderer._init: needs a canvas node";
		}
	}
	else
	{
		throw "Duedo.Renderer._init: destination canvas is undefined";
	}

	if(!this.Canvas.getContext)
	{
		throw "Duedo.Renderer: your browser does not support the canvas rendering";
	}

	/*Instantiate context2d*/
	this.Context = this.Canvas.getContext("2d");

	this.TransformationMatrix = [1, 0, 0, 1, 0, 0];
	this._PrepareSmoothing();
	this._PrepareBlendModes();
	
	this.Renderer.ClearColor = "rgba(141, 163, 193, 1)";

	return this;
};



/*
 * CanvasBlendModes
 * @public
*/
Duedo.BlendModes = {
	NORMAL:      null,
	ADD:         null,
	MULTIPLY:    null,
	SCREEN:      null,
	OVERLAY:     null,
	DARKEN:      null,
	LIGHTER:     null,
	COLOR_DODGE: null,
	COLOR_BURN:  null,
	HARD_LIGHT:  null,
	SOFT_LIGHT:  null,
	DIFFERENCE:  null,
	EXCLUSION:   null,
	HUE:         null,
	SATURATION:  null,
	COLOR:       null,
	LUMINOSITY:  null
};



/*
 * Join
 * @public
 * Extends the Duedo.Renderer
*/
Duedo.CanvasRenderer.prototype.Join = function() {

	for(var i in this.SharedMethods)
		if(!this.Renderer[this.SharedMethods[i]])
			this.Renderer[this.SharedMethods[i]] = this[this.SharedMethods[i]];

	for(var i in this.SharedProperties)
		if(!this.Renderer[this.SharedProperties[i]])
			this.Renderer[this.SharedProperties[i]] = this[this.SharedProperties[i]];

	this.Renderer.Context = this.Context;

	return this;
};



/*
 * Clear
 * @public/shared
*/
Duedo.CanvasRenderer.prototype.Clear = function() {

	if( this.ClearColor)
	{
		this.Context.fillStyle = this.ClearColor;
		this.Context.fillRect(this.Game.Viewport.Offset.X, this.Game.Viewport.Offset.Y, this.Canvas.width, this.Canvas.height);
	}
	else
	{	
		this.Context.clearRect(this.Game.Viewport.Offset.X, this.Game.Viewport.Offset.Y, this.Canvas.width, this.Canvas.height);
	}

}



/*
 * Translate
 * @public/shared
*/
Duedo.CanvasRenderer.prototype.Translate = function(x, y) {
	this.Context.translate(x, y);
};



/*
 * Draw
 * @public/shared
*/
Duedo.CanvasRenderer.prototype.Draw = function(collection, pstate) {

	//Cycle
	var lng = collection.length - 1;

	while ((ent = collection[lng--]) != null) {

		if (ent.ParentState != this.Game.StateManager.CurrentState()
			&& ent.ParentState != -1 && pstate != -1
			|| !ent["Draw"])
			continue;

		/*Mem render order id*/
		ent.RenderOrderID = this.CurrentRenderOrderID++;

		/*Render the parent graphic object*/
		ent.Draw(this.Context); 

		/*Update min and max */
		if (this._Cache["_RequestMinMaxUpdate"])
			this._UpdateMinMaxPlane(ent);

		/*Render sub-children*/
		if (Duedo.IsArray(ent.Children))
			this.Draw(ent.Children, this.Context, -1);
	}


};



/*
 * Save
 * @public
*/
Duedo.CanvasRenderer.prototype.Save = function() {
	this.Context.save();
};



/*
 * Restore
 * @public
*/
Duedo.CanvasRenderer.prototype.Restore = function() {
	this.Context.restore();
};



/*
 * SetTransformationMatrix
 * @public/shared
*/
Duedo.CanvasRenderer.prototype.ApplyTransformationMatrix = function() {

	this.Context.setTransform(
			this.TransformationMatrix[0],
			this.TransformationMatrix[1],
			this.TransformationMatrix[2],
			this.TransformationMatrix[3],
			this.TransformationMatrix[4],
			this.TransformationMatrix[5]
		);

};



/*
 * Smoothing
 * Set smoothing
 * !without arguments to get the current status
*/
Duedo.CanvasRenderer.prototype.Smoothing = function(/*bool*/boolv) {

	if(!Duedo.Utils.IsNull(this.SmoothProperty))
	{
		if(typeof boolv !== "undefined") {
			this.Context[this.SmoothProperty] = boolv;
			this.SmoothingEnabled = boolv;
		}
	}

	return this.SmoothingEnabled;

}



/*
 * _PrepareBlendModes
 * @private
*/
Duedo.CanvasRenderer.prototype._PrepareBlendModes = function() {

	/*Check blend modes support*/
	if (Duedo.Utils.Can.BlendModes()) {
		this.Renderer.BlendModesEnabled = true;
		Duedo.BlendModes.NORMAL = "source-over";
		Duedo.BlendModes.ADD = "lighter";
		Duedo.BlendModes.MULTIPLY = "multiply";
		Duedo.BlendModes.SCREEN = "screen";
		Duedo.BlendModes.OVERLAY = "overlay";
		Duedo.BlendModes.DARKEN = "darken";
		Duedo.BlendModes.LIGHTER = "lighter";
		Duedo.BlendModes.COLOR_DODGE = "color-dodge";
		Duedo.BlendModes.COLOR_BURN = "color-burn";
		Duedo.BlendModes.HARD_LIGHT = "hard-light";
		Duedo.BlendModes.SOFT_LIGHT = "soft-light";
		Duedo.BlendModes.DIFFERENCE = "difference";
		Duedo.BlendModes.EXCLUSION = "exclusion";
		Duedo.BlendModes.HUE = "hue";
		Duedo.BlendModes.SATURATION = "saturation";
		Duedo.BlendModes.COLOR = "color";
		Duedo.BlendModes.LUMINOSITY = "luminosity";
	}
	else {
		Duedo.BlendModes.NORMAL = "source-over";
		Duedo.BlendModes.ADD = "lighter";
		Duedo.BlendModes.MULTIPLY = "source-over";
		Duedo.BlendModes.SCREEN = "source-over";
		Duedo.BlendModes.OVERLAY = "source-over";
		Duedo.BlendModes.DARKEN = "source-over";
		Duedo.BlendModes.LIGHTER = "source-over";
		Duedo.BlendModes.COLOR_DODGE = "source-over";
		Duedo.BlendModes.COLOR_BURN = "source-over";
		Duedo.BlendModes.HARD_LIGHT = "source-over";
		Duedo.BlendModes.SOFT_LIGHT = "source-over";
		Duedo.BlendModes.DIFFERENCE = "source-over";
		Duedo.BlendModes.EXCLUSION = "source-over";
		Duedo.BlendModes.HUE = "source-over";
		Duedo.BlendModes.SATURATION = "source-over";
		Duedo.BlendModes.COLOR = "source-over";
		Duedo.BlendModes.LUMINOSITY = "source-over";
	}

	return this;

};



/*
 * _PrepareSmoothing
 * @private
*/
Duedo.CanvasRenderer.prototype._PrepareSmoothing = function() {

	/*SmoothProperty*/
	if("imageSmoothingEnabled" in this.Context)
		this.SmoothProperty = "imageSmoothingEnabled";
	else if("webkitImageSmoothingEnabled" in this.Context)
		this.SmoothProperty = "webkitImageSmoothingEnabled";
	else if("mozImageSmoothingEnabled" in this.Context)
		this.SmoothProperty = "mozImageSmoothingEnabled";
	else if("oImageSmoothingEnabled" in this.Context)
		this.SmoothProperty = "oImageSmoothingEnabled";
	else
		this.SmoothProperty = null;

	if(this.SmoothProperty)
		this.Smoothing(true);

};



/*
 * BlendMode
 * @public/shared
*/
Duedo.CanvasRenderer.prototype.BlendMode = function(bmode) {

	if(typeof bmode == "undefined")
		return this.Context.globalCompositeOperation;

	return this.Context.globalCompositeOperation = bmode;

};


/*
 * Scale
*/
Duedo.CanvasRenderer.prototype.Scale = function(ws, hs) {
	this.TransformationMatrix[0] = ws;
	this.TransformationMatrix[3] = hs;
};