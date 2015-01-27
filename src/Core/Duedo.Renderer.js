/*
==============================
Duedo.Renderer
Author: http://www.edoardocasella.it
Main rendering class, cycle and draw all the game elements in the buffer

Notes:

//Controlla per note: PreRender()

==============================
*/

Duedo.Renderer = function( gameContext, canvas, renderer) {

	this.Game;
	this._Cache = {};

	/*Canvas2d*/
	this.Canvas;
	this.Context;
	
	/*Generic*/
	this.FillColor = "rgba(141, 163, 193, 1)";
	this.Alpha;
	this.TransformationMatrix;
	this._Angle = 0;
	this.ClearBeforeRender = true;
	
	/*Smoothing*/
	this.SmoothProperty;
	this._EnableSmoothing = false;
	
	/*Blend mode*/
	this.CurrenBlendMode = null;
	this.BlendModesEnabled = false;
	
	/*Sorting*/
	this.SortPlanes;
	this._LastPlane;
	this.Sorting = {
		SortBy: "Z",
		OrderType: "ascending",
		MaxZPlane: 0,
		MinZPlane: 0
	};

	/*important*/
	this.CurrentRenderOrderID = 0;


	this._init(gameContext, canvas, renderer);

};


/*Constructor*/
Duedo.Renderer.prototype.constructor = Duedo.Renderer;


/*Canvas BlendModes*/
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
 * _init
*/
Duedo.Renderer.prototype._init = function(gameContext, canvas, renderer) {

	if(!Duedo.Utils.IsNull(gameContext))
	{
		this.Game = gameContext || Duedo.Global.Games[0];
	}
	else
	{
		throw "Duedo.Renderer._init: gameContext is undefined";
	}

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

	/*Init std configuration*/
	this.TransformationMatrix = [1, 0, 0, 1, 0, 0];
	this.Alpha                = 1;
	this.SortPlanes           = true;

	
	//Renderer type
	if(Duedo.Utils.IsNull(renderer) || renderer !== "canvas" && renderer !== "webgl")
	{
		this.RendererType = "canvas";
	}
	else 
	{
		this.RendererType = renderer;
	}
		

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


	/*Check blend modes support*/
	if(Duedo.Utils.Can.BlendModes())
	{
		this.BlendModesEnabled       = true;
		Duedo.BlendModes.NORMAL      = "source-over";
		Duedo.BlendModes.ADD         = "lighter";
		Duedo.BlendModes.MULTIPLY    = "multiply";
		Duedo.BlendModes.SCREEN      = "screen";
		Duedo.BlendModes.OVERLAY     = "overlay";
		Duedo.BlendModes.DARKEN      = "darken";
		Duedo.BlendModes.LIGHTER     = "lighter";
		Duedo.BlendModes.COLOR_DODGE = "color-dodge";
		Duedo.BlendModes.COLOR_BURN  = "color-burn";
		Duedo.BlendModes.HARD_LIGHT  = "hard-light";
		Duedo.BlendModes.SOFT_LIGHT  = "soft-light";
		Duedo.BlendModes.DIFFERENCE  = "difference";
		Duedo.BlendModes.EXCLUSION   = "exclusion";
		Duedo.BlendModes.HUE         = "hue";
		Duedo.BlendModes.SATURATION  = "saturation";
		Duedo.BlendModes.COLOR       = "color";
		Duedo.BlendModes.LUMINOSITY  = "luminosity";
	}
	else
	{   
		Duedo.BlendModes.NORMAL      = "source-over";
		Duedo.BlendModes.ADD         = "lighter";
		Duedo.BlendModes.MULTIPLY    = "source-over";
		Duedo.BlendModes.SCREEN      = "source-over";
		Duedo.BlendModes.OVERLAY     = "source-over";
		Duedo.BlendModes.DARKEN      = "source-over";
		Duedo.BlendModes.LIGHTER     = "source-over";
		Duedo.BlendModes.COLOR_DODGE = "source-over";
		Duedo.BlendModes.COLOR_BURN  = "source-over";
		Duedo.BlendModes.HARD_LIGHT  = "source-over";
		Duedo.BlendModes.SOFT_LIGHT  = "source-over";
		Duedo.BlendModes.DIFFERENCE  = "source-over";
		Duedo.BlendModes.EXCLUSION   = "source-over";
		Duedo.BlendModes.HUE         = "source-over";
		Duedo.BlendModes.SATURATION  = "source-over";
		Duedo.BlendModes.COLOR       = "source-over";
		Duedo.BlendModes.LUMINOSITY  = "source-over";
	}

};



/*
 * PreRender
*/
Duedo.Renderer.prototype.PreRender = function() {

	/*Check whether it is necessary to sort the objects by Z*/
	if(this.SortPlanes)
	{
		//Sort state children
		if (!Duedo.Utils.IsNull(this.Game.Entities[this.Game.StateManager.CurrentState()])) {
			/*ADD/FIX: se pi� oggetti hanno lo stesso Z chi viene usato per prima? Stessa cosa nel renderer*/
			this.SortList(this.Game.Entities[this.Game.StateManager.CurrentState()], this.Sorting.OrderType);
			this._Cache["_RequestMinMaXUpdate"] = true;
		}

		//Sort stage children
		this.SortList(this.Game.Stage.Children, this.Sorting.OrderType);

		this.SortPlanes = false;
	}


	return this;

};




/*
 * Render
 * Main rendering loop
*/
Duedo.Renderer.prototype.Render = function() {

	/*Transform and scale*/
	this.SetTransformationMatrix();
	
	/*Translate*/
	this.Translate(-this.Game.Viewport.Offset.X, -this.Game.Viewport.Offset.Y);
	
	if(this.ClearBeforeRender)
	{
		this.Clear();
	}
	
	//Draw entities of the current state
	var cs = this.Game.StateManager.CurrentState();
	
	//Cycle
	if(!Duedo.Utils.IsNull(this.Game.Entities[cs]))
	{
		for(var i = this.Game.Entities[cs].length - 1; i >= 0; i--)
		{
			child = this.Game.Entities[cs][i];
		   
			if (child["Draw"]) {
				child.RenderOrderID = this.CurrentRenderOrderID++;

				child.Draw(this.Context);

				if (this._Cache["_RequestMinMaXUpdate"])
					this._UpdateMinMaxPlane(child);

				/*Draw attached children*/
				if(child.Children)
				if(child.Children.length) 
				{
					for(var x = child.Children.length - 1; x >= 0; x--) 
					{
						if(child.Children[x]["Draw"]) 
						{
							child.Children[x].RenderOrderID = this.CurrentRenderOrderID++;
							child.Children[x].Draw(this.Context);

							if (this._Cache["_RequestMinMaXUpdate"])
								this._UpdateMinMaxPlane(child.Children[x]);
						}
					}       
				} 
			}
		}
	}

	/*Draw main stage entities*/
	this._DrawStage(this.Context);

	/*Render additional graphics from the current state*/
	this.Game.StateManager.RenderState(this.Context);

	return this;

};



/*
 * _DrawStage
 * @private
 * Draw everything inside the generic stage
*/
Duedo.Renderer.prototype._DrawStage = function (ctx) {


	for (var i = this.Game.Stage.Children.length - 1; i >= 0; i--) {

		var ent = this.Game.Stage.Children[i];

		if (!ent.Renderable) {
			continue;
		}

		if (!Duedo.Utils.IsNull(ent["Draw"])) {

			ent.RenderOrderID = this.Game.Renderer.CurrentRenderOrderID++;
			ent.Draw(ctx);

			if (this._Cache["_RequestMinMaXUpdate"])
				this._UpdateMinMaxPlane(ent);

			if (ent.Children)
			if (ent.Children.length)
			{
				for (var x = ent.Children.length - 1; x >= 0; x--) {

					if (typeof ent.Children[x]["Draw"] === "undefined")
					{
						ent.Children[x].RenderOrderID = this.Game.Renderer.CurrentRenderOrderID++;
						ent.Children[x].Draw(ctx);

						if (this._Cache["_RequestMinMaXUpdate"])
							this._UpdateMinMaxPlane(ent.Children[x]);
					}

				}
			}
		}


	}

};



/*
 * _UpdateMinMaxPlane
 * @private
 * Update the min and max Z plane value
*/
Duedo.Renderer.prototype._UpdateMinMaxPlane = function (child) {

	if (child.Z > this.Sorting.MaxZPlane)
		this._Cache["MaxZPlane"] = child.Z;
	if (child.Z < this.Sorting.MinZPlane)
		this._Cache["MinZPlane"] = child.Z;

};




/*
 * PostRender
 * @public
 * Draws things that should always be in the foreground, like debug info etc...
*/
Duedo.Renderer.prototype.PostRender = function() { 

	/*!Reset render order id counter*/
	this.CurrentRenderOrderID = 0;

	/*Render debug informations*/
	if(this.Game.Debug)
		this._RenderDebug();

	/*No more MinMaxUpdate til the next entity*/
	if (this._Cache["_RequestMinMaXUpdate"]) {
		this._Cache["_RequestMinMaXUpdate"] = false;
	}

	/*Render FPS*/
	if (this.Game._Cache["FPS"])
		this.Game._Cache["FPS"].Text = "FPS: " + this.Game.FPS().toFixed(2);

};



/*
 * _RenderDebugInfo
 * @private
 * Render debug informations about viewport etc...
*/
Duedo.Renderer.prototype._RenderDebug = function() {

	/*Viewport debug info*/
	if(this.Game.Viewport.Debug)
	{
		this.Game.Viewport.RenderDebugInfo(this);
	}
};



/*
 * RenderQuadTree
 * @public
 * Render a quad tree
*/
Duedo.Renderer.prototype.RenderQuadTree = function(qt) {
	if(qt.Type === Duedo.QUADTREE)
		Duedo.QuadTree.Draw(qt, this.Context);
};



/*
 * Translate
 * Translate context by x/y
*/
Duedo.Renderer.prototype.Translate = function(x, y) {
	this.Context.translate(x, y);
};



/*
 * SetTransformationMatrix
 *
*/
Duedo.Renderer.prototype.SetTransformationMatrix = function() {
	
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
Object.defineProperty(Duedo.Renderer.prototype, "Rotation", {

	set: function (rad) {
		this.Context.rotate(rad);
	}

});
*/


/*
 * SortPlanesBy
 * Sort objects by this.SortPlanesBy property
*/
Duedo.Renderer.prototype.SortList = function(list, orderType) {

	if(orderType === "ascending" || Duedo.Utils.IsNull(orderType))
	{   
	   return Duedo.Utils.SortArrayAscending(list, this.Sorting.SortBy);
	}
	else if(orderType === "descending")
	{
		return Duedo.Utils.SortArrayDescending(list, this.Sorting.SortBy);
	}

};



/*
 * MaxZPlane
 * @public
 * Return max z plane
*/
Object.defineProperty(Duedo.Renderer.prototype, "MaxZPlane", {

	get: function () {
		return this._Cache["MaxZPlane"];
	}

});



/*
 * MinZPlane
 * @public
 * Return min z plane
*/
Object.defineProperty(Duedo.Renderer.prototype, "MinZPlane", {

	get: function () {
		return this._Cache["MinZPlane"];
	}

});



/*
 * Clear
*/
Duedo.Renderer.prototype.Clear = function() {

	if( this.FillColor )
	{
		this.Context.fillStyle = this.FillColor;
		this.Context.fillRect(this.Game.Viewport.Offset.X, this.Game.Viewport.Offset.Y, this.Canvas.width, this.Canvas.height);
	}
	else
	{
		this.Context.clearRect(this.Game.Viewport.Offset.X, this.Game.Viewport.Offset.Y, this.Canvas.width, this.Canvas.height);
	}

};



/*
 * EnableSmoothing
*/
Object.defineProperty(Duedo.Renderer.prototype, "EnableSmoothing", {
	
	set:function(value) {

		if(!Duedo.Utils.IsNull(this.SmoothProperty))
		{
			this.Context[this.SmoothProperty] = /*bool*/ value;
			this._EnableSmoothing = value;
		}
		
	},

	get: function() {
		return this._EnableSmoothing;
	}
});




/*
 * BlendMode
 * Set gloabalCompositeOperation
*/
Object.defineProperty(Duedo.Renderer.prototype, "BlendMode", {
	
	get: function() {
		return this.Context.globalCompositeOperation;
	},

	set: function(value) {
		this.Context.globalCompositeOperation = value;
	}

});



/*
 * Center
 * Get canvas center
*/
Object.defineProperty(Duedo.Renderer.prototype, "ViewCenter", {
	
	get:function() {
		return new Duedo.Vector2(this.Canvas.width / 2, this.Canvas.height / 2);
	}

});




/*
 * Scale
 * ws: width scale
 * hs: height scale
*/
Duedo.Renderer.prototype.Scale = function(ws, hs) {
	this.TransformationMatrix[0] = ws;
	this.TransformationMatrix[3] = hs;
};