






Duedo.WebGLRenderer = function(renderer, canvas) {

	this.Renderer;

	/*Joinable methods*/
	this.SharedMethods = [
		"Clear",
		"Draw",
		"SetViewport"
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

	this.SetViewport(0, 0, canvas.width, canvas.height);
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
 * Disjoin
 * @public
 * Disjoin this renderer from the game context
*/
Duedo.WebGLRenderer.prototype.Disjoin = function() {

	for(var i in this.SharedMethods)
		if(this.Renderer[this.SharedMethods[i]])
			delete this.Renderer[this.SharedMethods[i]];

	for(var i in this.SharedProperties)
		if(this.Renderer[this.SharedProperties[i]])
			delete this.Renderer[this.SharedProperties[i]];


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
 * SetViewport
 * @public
*/
Duedo.WebGLRenderer.prototype.SetViewport = function(x, y, w, h) {
	this.Context.viewport(x, y, w, h);
};



/*
 * Draw
 * @public
 * Main rendering loop
*/
Duedo.WebGLRenderer.prototype.Draw = function(collection, pstate) {

	/*Internal reference to this object (WebGLRenderer)*/
	var glr = this._r; 

	//Cycle
	var lng = collection.length - 1;

	while ((ent = collection[lng--]) != null) {

		if (ent.ParentState != this.Game.StateManager.CurrentState()
			&& ent.ParentState != -1 && pstate != -1)
			continue;

		/*Mem render order id*/
		ent.RenderOrderID = this.CurrentRenderOrderID++;

		/*Render the parent graphic object*/
		switch(ent.Type) 
		{
			case Duedo.IMAGE: 
				glr.DrawImage(ent);
			break;
			case Duedo.SPRITESHEET:
				glr.DrawSpritesheet(ent);
			break;
			case Duedo.PARTICLE_SYSTEM:
				glr.DrawParticleSystem(ent);
			break;
			case Duedo.TEXT:
				glr.Draw2dText(ent);
			break;
		}

		/*Update min and max */
		if(this._Cache["_RequestMinMaxUpdate"])
			this._UpdateMinMaxPlane(ent);

		/*Render sub-children*/
		if(Duedo.IsArray(ent.Children))
			glr.Draw.call(this, ent.Children, this.Context, -1);
	}


};



/*
 * DrawImage
 * @public
 * Draw an image into the screen
*/
Duedo.WebGLRenderer.prototype.DrawImage = function(image) {

	var gl = this.Context;
	var texture;

	texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);

	// Flip the image's Y axis to match the WebGL texture coordinate space.
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	    
	// Set the parameters so we can render any size image.        
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); 
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

	  // Upload the resized canvas image into the texture.
	//    Note: a canvas is used here but can be replaced by an image object. 
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.Canvas);

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


/*
 * Draw2dText
 * @public
 * Draw simple text into the screen
*/
Duedo.WebGLRenderer.prototype.Draw2dText = function(text) {

};