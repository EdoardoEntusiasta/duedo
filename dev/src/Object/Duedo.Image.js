/*
==============================
Duedo.Image
Author: http://www.edoardocasella.it
==============================
*/


 /**
  * @class
  * @classdesc Create a new image object to be rendered
  * @memberof Duedo
  * @name Duedo.Image
  * @inner
  * @constructor
  * @param {Duedo.Game} gameContext A reference to the current game context (Duedo.GameContext)
  * @param {file} bufferedImage A buffered file previously loaded
  */
Duedo.Image = function(gameContext, bufferedImage) {
	Duedo.GraphicObject.call(this);

    /**
     * A reference to the running game context
     * @property {Duedo.GameContext}  Game               - Reference to the game context
     */
	this.Game = gameContext || Duedo.Global.Games[0];

    /**
     * A static reference to the type
     * @property {integer}  [Type=Duedo.IMAGE]               - Type of this object
     */
	this.Type = Duedo.IMAGE;


	this._init(bufferedImage);
};


Duedo.Image.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Image.prototype.constructor = Duedo.Image;


/**
 * Initialize
 * @memberof Duedo.Image
 * @param {file} bufferedImage
 * @ignore
 */
Duedo.Image.prototype._init = function(bufferedImage) {
	this._super();
    
	if(!Duedo.Utils.IsNull(bufferedImage))
	{
		this.Source = bufferedImage;
		this._Width  = this.Source.naturalWidth / Duedo.Conf.PixelsInMeter;
		this._Height = this.Source.naturalHeight / Duedo.Conf.PixelsInMeter;
	}

};



/**
 * PreUpdate
 * @memberof Duedo.Image
 * @param {float} deltaT
 * @ignore
 */
Duedo.Image.prototype.PreUpdate = function(deltaT) {
};



/**
 * Update
 * @memberof Duedo.Image
 * @param {float} deltaT
 * @ignore
 */
Duedo.Image.prototype.Update = function(deltaT) {
};



/**
 * PostUpdate
 * @memberof Duedo.Image
 * @param {float} deltaT
 * @ignore
 */
Duedo.Image.prototype.PostUpdate = function(deltaT) {

    if(this.Body) {
        var bpos = this.Body.GetPosition();
        this.Location.X = bpos.x;
        this.Location.Y = bpos.y;
        this.Rotation = this.Body.GetAngle();
    }

    //Update animations
    this.UpdateAnimations(deltaT);

    /*Renderable*/
    this.Renderable = (this.Game.Viewport.Intersects(
        new Duedo.Rectangle(
            !this.FixedToViewport 
            ? 
                new Duedo.Vector2(this.Location.X - this.Width * this.Anchor.X, this.Location.Y - this.Height * this.Anchor.Y)
            : 
                new Duedo.Vector2(this.ViewportOffset.X / this.Game.Viewport.Zoom + this.Game.Viewport.View.Location.X, this.ViewportOffset.Y / this.Game.Viewport.Zoom + this.Game.Viewport.View.Location.Y),
            this.Width, 
            this.Height)
    ) && this.Alpha > 0);

    //Update location if it's fixed to viewport
    if(this.FixedToViewport)
    {
        this.Location.X = this.Game.Viewport.View.Location.X * this.Game.Viewport.Zoom + this.ViewportOffset.X;
        this.Location.Y = this.Game.Viewport.View.Location.Y * this.Game.Viewport.Zoom + this.ViewportOffset.Y;
    }

};



/**
 * The width of the image, possibly scaled according to the vector Image.Scale (x, y) 
 * @name Width
 * @memberof Duedo.Image
 * @returns {float} the width of the image
 */
Object.defineProperty(Duedo.Image.prototype, "Width", {
    get:function() {
        return (this._Width * this.Scale.X);
    },
    set:function(val) {
        //this.Scale.X = val / this._Width;
        this._Width = val;
    }
});



/**
 * The height of the image, possibly scaled according to the vector Image.Scale (x, y) 
 * @name Height
 * @memberof Duedo.Image
 * @returns {float} the height of the image
 */
Object.defineProperty(Duedo.Image.prototype, "Height", {
    get:function() {
        return (this._Height * this.Scale.Y);
    },
    set:function(val) {
        //this.Scale.Y = val / this._Height;
        this._Height = val;
    }

});



/**
 * The half width of the image, possibly scaled according to the vector Image.Scale (x, y) 
 * @name HalfWidth
 * @memberof Duedo.Image
 * @returns {float} the half width of the image
 */
Object.defineProperty(Duedo.Image.prototype, "HalfWidth", {
    get:function() {
        return this.Width / 2;
    }
});



/**
 * The half height of the image, possibly scaled according to the vector Image.Scale (x, y) 
 * @name HalfHeight
 * @memberof Duedo.Image
 * @returns {float} the half height of the image
 */
Object.defineProperty(Duedo.Image.prototype, "HalfHeight", {
    get:function() {
        return this.Height / 2;
    }
});



/**
 * The drawing method of this image object
 * @private
 * @name Draw
 * @memberof Duedo.Image
 * @ignore
 */
Duedo.Image.prototype.Draw = function(context, location, forceRender = false) {

	if (!this.Renderable && !forceRender || this.Alpha === 0 || !this.Source )
    {
        return this; 
    }
    
	context.save();
    context.globalAlpha = this.Alpha * this.Game.World.Alpha;
 
    const Destination = location ? location : this.Location;

    /*
     * Rotate if needed
    */    
    if( this.Rotation !== 0 )
    {
        /*Get center based on PixelsInMeter and dimension*/
        var mLocation = Destination.Clone()
            .MultiplyScalar(Duedo.Conf.PixelsInMeter)
            .Subtract(new Duedo.Vector2(this.HalfWidth, this.HalfHeight))
            .Add(
                new Duedo.Vector2((this.Width * this.Anchor.X), (this.Height * this.Anchor.Y))
            );
        
        context.translate(mLocation.X, mLocation.Y);
        context.rotate(this.Rotation);
        context.translate(-(mLocation.X), -(mLocation.Y));
    }

    if(this.BlendMode)
        context.globalCompositeOperation = this.BlendMode;

    if(this.FixedToViewport && !Duedo.Conf.ScaleFixedToViewportOnZoom) {
        context.scale(this.Game.Viewport.ZoomMin / this.Game.Viewport.Zoom, this.Game.Viewport.ZoomMin / this.Game.Viewport.Zoom);
    }

    if(this.FlipX) {
        context.translate(DToPixels(Destination.X), 0)
        context.scale(-1, 1);
        context.translate(-DToPixels(Destination.X), 0)
    }

    /*Draw*/
    context.drawImage(
        this.Source,    
        0, 0,   
        this.Source.width, this.Source.height,
        DToPixels(Destination.X) - DToPixels(this.Width * this.Anchor.X),  
        DToPixels(Destination.Y) - DToPixels(this.Height * this.Anchor.Y),
        DToPixels(this.Width), DToPixels(this.Height)
    );
    
    if(this.Debug) {
        // Draw wrapper
        context.beginPath();
        context.strokeStyle = 'green';
        context.fillStyle = 'black';
        context.rect(
            DToPixels(Destination.X) - DToPixels(this.Width * this.Anchor.X),
            DToPixels(Destination.Y) - DToPixels(this.Height * this.Anchor.Y), 
            DToPixels(this.Width),
            DToPixels(this.Height)
        );
        context.stroke();
        // Draw center
        context.beginPath();
        const centerSize = 1;
        context.rect(
            DToPixels(Destination.X),
            DToPixels(Destination.Y), centerSize, centerSize);
        context.fill();
        context.font = '12px arial';
        context.fillStyle = 'green';
        context.fillText(`Image X:${Destination.X.toFixed(0)} Y:${Destination.Y.toFixed(0)}`, 
            DToPixels(Destination.X) - DToPixels(this.Width * 0.5), 
            DToPixels(Destination.Y - 0.5) - DToPixels(this.Height * 0.5)
        );
    }

    context.restore();
    


    return this;

};


