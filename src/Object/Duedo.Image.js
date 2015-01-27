/*
==============================
Duedo.Image
Author: http://www.edoardocasella.it

Notes:
Simple image
==============================
*/
Duedo.Image = function(gameContext, bufferedImage) {
	Duedo.GraphicObject.call(this);
	this.Game = gameContext || Duedo.Global.Games[0];
	this.Type = Duedo.IMAGE;
    
	this._init(bufferedImage);
};


/*Inherit GraphicObject*/
Duedo.Image.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Image.prototype.constructor = Duedo.Image;


/*
 * _init
 * @private
*/
Duedo.Image.prototype._init = function(bufferedImage) {
	this._super();

	if(!Duedo.Utils.IsNull(bufferedImage))
	{
		this.Source = bufferedImage;
		this._Width  = this.Source.naturalWidth;
		this._Height = this.Source.naturalHeight;
	}

};



/*
 * PreUpdate
 * @public
*/
Duedo.Image.prototype.PreUpdate = function(deltaT) {
};



/*
 * Update
 * @public
*/
Duedo.Image.prototype.Update = function(deltaT) {
};



/*
 * PostUpdate
 * @public
*/
Duedo.Image.prototype.PostUpdate = function(deltaT) {

    if(this.Body)
    {
        this.Body.Link(deltaT);
    }

    //Update animations
    this.UpdateAnimations(deltaT);

    /*Renderable*/
    this.Renderable = (this.Game.Viewport.Intersects(
        new Duedo.Rectangle(
            this.Location,
            this.Width, 
            this.Height)
    ) && this.Alpha > 0);

    //Update location if it's fixed to viewport
    if(this.FixedToViewport)
    {
        this.Location.X = this.Game.Viewport.View.Location.X + this.ViewportOffset.X;
        this.Location.Y = this.Game.Viewport.View.Location.Y + this.ViewportOffset.Y;
    }

};



/*
 * Width
 * @public
 * Width of this image
*/
Object.defineProperty(Duedo.Image.prototype, "Width", {
    get:function() {
        return this._Width * this.Scale.X;
    },
    set:function(val) {
        this.Scale.X = val / this._Width;
        this._Width = val;
    }
});



/*
 * Height
 * @public
 * Height of this image
*/
Object.defineProperty(Duedo.Image.prototype, "Height", {
    get:function() {
        return this._Height * this.Scale.Y;
    },
    set:function(val) {
        this.Scale.Y = val / this._Height;
        this._Height = val;
    }

});



/*
 * HalfWidth
 * @public
 * HalfWidth of this image
*/
Object.defineProperty(Duedo.Image.prototype, "HalfWidth", {
    get:function() {
        return this.Width / 2;
    }
});



/*
 * HalfHeight
 * @public
 * HalfHeight of this image
*/
Object.defineProperty(Duedo.Image.prototype, "HalfHeight", {
    get:function() {
        return this.Height / 2;
    }
});



/*
 * Draw
 * @public
*/
Duedo.Image.prototype.Draw = function(context) {

	if (!this.Renderable || this.Alpha === 0 || !this.Source )
    {
        return this; 
    }
    
	context.save();
    context.globalAlpha = this.Alpha * this.Game.World.Alpha;
    
    /*
     * Rotate if needed
    */    
    if( this.Rotation !== 0 )
    {
        context.translate(this.Location.X + (this.Width * this.Anchor.X), this.Location.Y + (this.Height * this.Anchor.Y));
        context.rotate(this.Rotation);
        context.translate(-(this.Location.X +  (this.Width * this.Anchor.X)), -(this.Location.Y + (this.Height * this.Anchor.Y)));
    }

    if(this.BlendMode)
        context.globalCompositeOperation = this.BlendMode;
    
    /*Draw*/
    context.drawImage(
        this.Source,    
            0, 0,   
                this.Source.width, this.Source.height, 
                    this.Location.X, this.Location.Y,
                        this.Width, this.Height); 
                            

    context.restore();
    
    //DrawBody
    if(this.Body && this.Game.PhysicsEngine.Debug)
        this.Body.Draw(context);


    return this;

};


