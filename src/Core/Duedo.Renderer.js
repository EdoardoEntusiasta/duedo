/*
==============================
Duedo.Renderer
Author: http://www.edoardocasella.it
Main rendering class, cycle and draw all the game elements in the buffer

Notes:

//Controlla per note: PreRender()

==============================
*/


/*
 * Duedo supported renderers
*/
Duedo.Renderers = {
	CANVAS: 1,
	WEBGL: 2
}


/*Main Renderer*/
Duedo.Renderer = function( gameContext, canvas, renderer) {

	this.Game;
	this._Cache = {};

	/*Canvas2d*/
	this.Canvas;
	this.Context;

	/*Rendering API's | @default canvas2d */
	this.RenderType = Duedo.Renderers.CV;

	/*Generic*/
	this.ClearColor;
	this.Alpha;
	this._Angle = 0;
	this.ClearBeforeRender = true;
	
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

	/*Init std configuration*/
	this.Alpha                = 1;
	this.SortPlanes           = true;
	
	this._InitializeRenderer(renderer, canvas);

};


/*
 * _InitializeRenderer
 * @private
*/
Duedo.Renderer.prototype._InitializeRenderer = function(renderer, canvas) {

	this.Context = null;
	this.Canvas = canvas;

	//Renderer type
	if(!Duedo.Utils.IsNull(renderer))
		this.RenderType = renderer; else this.RenderType = Duedo.Renderers.CANVAS;

	if(this.RenderType == Duedo.Renderers.CANVAS)
		this._r = new Duedo.CanvasRenderer(this, canvas);
	else if(this.RenderType == Duedo.Renderers.WEBGL)
		this._r = new Duedo.WebGLRenderer(this, canvas);
	else throw "Renderer._InitializeRenderer: error, unrecognized renderer";

	if(this._r) {
		this._r.Join();
	}
	else
	{
		throw "Renderer: error during renderer initialization";
	}
};



/*
 * PreRender
*/
Duedo.Renderer.prototype.PreRender = function() {

	/*Check whether it is necessary to sort the objects by Z*/
	if(this.SortPlanes) {
		this.SortList(this.Game.Entities, this.Sorting.OrderType);
		this._Cache["_RequestMinMaxUpdate"] = true;
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
	if(this.ApplyTransformationMatrix)
		this.ApplyTransformationMatrix();

	/*Translate by viewport/camera*/
	if(this.Translate)
		this.Translate(-this.Game.Viewport.Offset.X, -this.Game.Viewport.Offset.Y);

	/*Clear*/
	if(this.ClearBeforeRender) 
		this.Clear();

	this.Draw(this.Game.Entities, null);

	/*Render additional graphics from the current state*/
	this.Game.StateManager.RenderState(this.Context);

	return this;

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

	/*No more MinMaxUpdate til the next entity*/
	if (this._Cache["_RequestMinMaxUpdate"]) {
		this._Cache["_RequestMinMaxUpdate"] = false;
	}

	/*Render FPS*/
	if (this.Game._Cache["FPS"])
		this.Game._Cache["FPS"].Text = "FPS: " + this.Game.FPS().toFixed(2);

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
 * Center
 * Get canvas center
*/
Object.defineProperty(Duedo.Renderer.prototype, "ViewCenter", {
	
	get:function() {
		return new Duedo.Vector2(this.Canvas.width / 2, this.Canvas.height / 2);
	}

});



