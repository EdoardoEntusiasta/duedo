






Duedo.WebGLRenderer = function(renderer, canvas) {

	this.Renderer;

	/*Joinable methods*/
	this.SharedMethods = [
		"Clear",
		"Draw",
	];

	this.SharedProperties = [
		"SmoothProperty", "SmoothingEnabled",
		"TransformationMatrix"
	];

	this.ClearColor

	this._init(renderer, canvas);
};




Duedo.WebGLRenderer.prototype._init = function(renderer, canvas) {

	this.Renderer = renderer;
	if(!this.Renderer)
		throw "WebGLRenderer: null Rendererer";

	try 
	{
		if(!(this.Context = canvas.getContext("webgl")))
			this.Context = canvas.getContext("experimental-webgl");
	}
	catch(e)
	{

	}

	if(!this.Context)
	{
		throw "Renderer._InitializeWebGLRenderer: error, your browser does not support webgl";
		return false;
	}

	this.Context.save = function() {};
	this.Context.measureText = function(a) { return {width:0, height:0} };
	this.Context.restore = function() {};


	this.Renderer.ClearColor = [1.0, 1.0, 1.0, 1.0];
};


/*
 * Join
 * @public
 * Extends the Duedo.Renderer
*/
Duedo.WebGLRenderer.prototype.Join = function(renderer, canvas) {

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
 * @public
*/
Duedo.WebGLRenderer.prototype.Clear = function() {

	//Set clear color to black, fully opaque
	this.Context.clearColor(this.ClearColor[0],
			this.ClearColor[1],
			this.ClearColor[2],
			this.ClearColor[3]);       

    // Enable depth testing
    //this.Context.enable(this.Context.DEPTH_TEST); 
  	// Near things obscure far things
    //this.Context.depthFunc(this.Context.LEQUAL);                          
    // Clear the color as well as the depth buffer.      
    this.Context.clear(this.Context.COLOR_BUFFER_BIT|this.Context.DEPTH_BUFFER_BIT);      
	
	return this;

};



/*
 * Draw
 * @public
 * Main rendering loop
*/
Duedo.WebGLRenderer.prototype.Draw = function(collection, pstate) {

	//Cycle
	var lng = collection.length - 1;

	while ((ent = collection[lng--]) != null) {

		if (ent.ParentState != this.Renderer.Game.StateManager.CurrentState()
			&& ent.ParentState != -1 && pstate != -1)
			continue;

		/*Mem render order id*/
		ent.RenderOrderID = this.Renderer.CurrentRenderOrderID++;

		/*Render the parent graphic object*/
		switch(ent.Type) 
		{
			case Duedo.IMAGE: 
				this.DrawImage(ent);
			break;
			case Duedo.SPRITESHEET:
				this.DrawSpritesheet(ent);
			break;
			case Duedo.PARTICLESYSTEM:
				this.DrawParticleSystem(ent);
			break;
		}

		/*Update min and max */
		if(this.Renderer._Cache["_RequestMinMaxUpdate"])
			this.Renderer._UpdateMinMaxPlane(ent);

		/*Render sub-children*/
		if(Duedo.IsArray(ent.Children))
			this.Draw(ent.Children, this.Context, -1);
	}


};



/*
 * DrawImage
 * @public
 * Draw an image into the screen
*/
Duedo.WebGLRenderer.prototype.DrawImage = function(image) {

};



/*
 * DrawSpritesheet
 * @public
 * Draw a spritesheet into the screen
*/
Duedo.WebGLRenderer.prototype.DrawSpritesheet = function(sprite) {

};



/*
 * DrawParticleSystem
 * @public
 * Draw a particle system
*/
Duedo.WebGLRenderer.prototype.DrawParticleSystem = function() {

};



/*
 * DrawParticle
 * @public
 * Draw a particle into the screen
*/
Duedo.WebGLRenderer.prototype.DrawParticle = function(part) {


};