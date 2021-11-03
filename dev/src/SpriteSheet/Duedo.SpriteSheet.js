/*
==============================
Duedo.SpriteSheet
Author: http://www.edoardocasella.it

Notes:
SpriteSheet object

Dimension is: this.FrameWidth(), this.FrameHeight()

Bindable (.Bind) events:
repeatreached - When the sequence has reached its maximum number of repetitions
repeated - When the sequence has completed a sequence
destroy - When the sprite was destroyed
start - When the sprite has triggered the sequence
==============================
*/


Duedo.SpriteSheet = function ( gameContext, bufferedImage, name ) {
    Duedo.GraphicObject.call(this);
    this.Game = gameContext || Duedo.Global.Games[0];
    this.Type = Duedo.SPRITESHEET;
    
    /*Private*/
    this._Parent;
    this._ElapsedTime;
    this._Sequences;
    this._Repeated;

    /*Public*/
    this.Repeat;
    this.AutoDestroy;
    this.ActiveSequence;
    this.Playing;
    this.Debug = false;
    this.Rate; /*0.05s*/
    this.FrameIndex;
    /*Current frame*/
    this.Frame;
    /*Initialize*/
    this._init( bufferedImage, name );

};




/*Inherit GraphicObject*/
Duedo.SpriteSheet.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.SpriteSheet.prototype.constructor = Duedo.SpriteSheet;




/*
 * _init
 * @private
*/
Duedo.SpriteSheet.prototype._init = function ( bufferedImage, name ) {
    this._super();

    this._Repeated       = 0;
    this._ElapsedTime    = 0;
    this._Sequences      = new Object();
    this.Repeat          = Infinity;
    this.AutoDestroy     = false;
    this.ActiveSequence  = null;
    this.Playing         = false;
    this.Rate            = 0.05;
    this.FrameIndex      = 0;
    this.Frame           = null;
    this.SequencesLength = 0;

    if( !Duedo.Utils.IsNull(bufferedImage) )
    {

        this.Source = bufferedImage;

        //Dimension of the whole spritesheet
        this._Width  = bufferedImage.naturalWidth;
        this._Height = bufferedImage.naturalHeight;


        //Initially show the entire spritesheet
        this.AddSequence("_default", [[0, 0, this._Width, this._Height]]);
        this.PlaySequence("_default");
    }
    else
    {
        this.Source = null;
    }
    
    
    this.Name = name || "spritesheet";


    return this;
};




/*
 * AddSequence
 * @sequenceName: string "myanimation"
 * @framesData: [ [frameOriginX, frameOriginY, frameWidth, frameHeight], [...] ]
*/
Duedo.SpriteSheet.prototype.AddSequence = function ( sequenceName, framesData, options ) {

    var newSequence = new Duedo.SSequence(this.Game, sequenceName);


    if(Duedo.Utils.IsNull(framesData))
    {
        framesData = [
            [0, 0, 0, 0]
        ];
    }

    // Convert width/height frame pixels to meters
    for(let i = 0; i < framesData.length; i++) {
        framesData[i][2] = framesData[i][2] / Duedo.Conf.PixelsInMeter;
        framesData[i][3] = framesData[i][3] / Duedo.Conf.PixelsInMeter;
    }

    //Compose sequence
    newSequence.Frames      = framesData;
    newSequence.FrameIndex  = 0;
    newSequence.Active      = true;
    newSequence.Parent      = this;
    newSequence.Rate        = options ? options.Rate >= 0 ? options.Rate : this.Rate : this.Rate;
    newSequence.Repeat      = options ? options.Repeat >= 0 ? options.Repeat : this.Repeat : this.Repeat;
    this._Sequences[sequenceName] = newSequence;
    
    this.SequencesLength++;

    return newSequence;
};




/*
 * GetSequence
 * @public
 * Return a Duedo.SSequence
*/
Duedo.SpriteSheet.prototype.GetSequence = function(sname) {

    for(var i in this._Sequences)
    {
        if(this._Sequences[i].Name === sname)
            return this._Sequences[i];
    }

    return null;
};




/*
 * Load animations from .json
 * OriginX, OriginY, FrameWidth, FrameHeight
*/
Duedo.SpriteSheet.prototype.Load = function ( file ) {


    if (typeof file === "undefined")
    {
        return;
    }

    file = JSON.parse(file);

    /*Frames sequences*/
    if( typeof file["Animations"] !== "undefined" )
    {
        for( var index in file["Animations"] )
        {
            this.AddSequence(index, file["Animations"][index]);

            /*Just to show an initial frame*/
            if( !this.ActiveSequence || this.ActiveSequence === "_default" )
            {
                this.PlaySequence(index);
                this.PauseSequence(index);
            }
        }
    }


    /*Properties*/
    if ( typeof file["Properties"] !== "undefined" )
    {
        for ( var index in file["Properties"] )
        {
            if( typeof this[index] !== "undefined" )
            {
                if( index == "Source" )
                {
                    this[index] = this.Game.Cache.GetImage(file["Properties"][index]);
                    continue;
                }

                if( index === "Scale" )
                {
                    var p = file["Properties"][index].replace(/\s/g, "").split(',');
                    this[index] = new Duedo.Vector2(p[0], p[1]);
                    continue;
                }
                this[index] = file["Properties"][index];
            }
        }
    }


    return this;

};



/**
 * ActiveSS
 * @returns the active sequence
 */
Duedo.SpriteSheet.prototype.ActiveSS = function () {
    return this._Sequences[ this.ActiveSequence ];
}



/*
 * PlaySequence
 * @sequenceName: the name of the sequence to start
 * @stopPreveSequence: (boolean) stop previous sequence, otherwise it will be paused
*/
Duedo.SpriteSheet.prototype.PlaySequence = function ( sequenceName, stopPrevSequence /*default: true*/) {

    if (stopPrevSequence === "undefined" || stopPrevSequence === true)
    {
        this.StopSequence(this.ActiveSequence);
    }
    
    if(sequenceName == this.ActiveSequence && this.Paused) {
        return this.ResumeSequence();
    }

    this._Repeated = 0;

    this.ActiveSequence = sequenceName;
    
    this._ElapsedTime = 0;

    this.ActiveSS().Reset();

    if( typeof this.ActiveSS() === "undefined" )
    {
        throw "Duedo.SpriteSheet: undefined sequence '" + sequenceName + "'";
    }
    else
    {
        this.ActiveSS().Active = true;

        if(sequenceName !== "_default")
        {
            this.Playing = true;
        }
        
    }

    return this.ActiveSS();

};



/*
 * Update
 * @deltaT: game loop delta time
 * Main loop
*/
Duedo.SpriteSheet.prototype.Update = function ( deltaT ) {
    
    this.SuperUpdate(deltaT);

    if(!this.Source) 
        throw "Spritesheet: error - undefined buffered source";

    /*AutoDestroy*/
    if(this._Repeated >= this.ActiveSS().Repeat)
    {
        if(this.AutoDestroy)
        {
            //Call ssequence triggers
            this._CallTriggers("destroy");
            this.InUse = false; 
        }
        else 
        {
            this.StopSequence(this.ActiveSequence);
        }

        this.ActiveSS()._CallTriggers("repeatreached");
        return this;
    }


    if (this.ActiveSequence === null || !this.ActiveSS().Active || this.ActiveSequence === "_default")
    {
        return this; 
    }


    this._ElapsedTime += deltaT;


    if (this._ElapsedTime < this.ActiveSS().Rate)
    {
        return this;
    }
        

    this.ActiveSS().FrameIndex++;
        
    //Repeat cycle
    if (this.ActiveSS().FrameIndex > this.ActiveSS().Frames.length - 1 && this.ActiveSS().Active)
    {   
        this._Repeated++;
        this.ActiveSS().FrameIndex = 0;

        // Prevent "jumping effect" (was a bug)
        if(this._Repeated >= this.ActiveSS().Repeat) {
            this.ActiveSS().FrameIndex = this.ActiveSS().Frames.length - 1;
        }

        //Call ssequence trigger
        this.ActiveSS()._CallTriggers("repeated");
    }
    

    this._ElapsedTime = 0;

    return this;
};



/*
 * StopSequence
 * @sequenceName: the name of the sequence to stop
*/
Duedo.SpriteSheet.prototype.StopSequence = function ( sequenceName ) {

    sequenceName = sequenceName || this.ActiveSequence;

    if ( typeof sequenceName !== "undefined" )
    {
        this._Sequences[sequenceName].FrameIndex = /*0*/ this._Sequences[sequenceName].Frames.length - 1;
        this._Sequences[sequenceName].Active     = false;
        this._Repeated                           = 0;
        this.Playing                             = false;
        this._ElapsedTime                        = 0;
    }


    return this;
};





/*
 * PauseSequence
 * @sequenceName: the name of the sequence to pause
*/
Duedo.SpriteSheet.prototype.PauseSequence = function ( sequenceName ) {

    sequenceName = sequenceName || this.ActiveSequence;

    if( typeof sequenceName !== "undefined" )
    {
        this._Sequences[sequenceName].Active = false;
        this.Playing = false;
        this.Paused = true;
    }


    return this;
};



/*
 * ToggleSequence
 * @sequenceName: the name of the sequence to toggle
*/
Duedo.SpriteSheet.prototype.ToggleSequence = function ( sequenceName ) {

    sequenceName = sequenceName || this.ActiveSequence;

    if( typeof sequenceName !== "undefined" )
    {
        this._Sequences[sequenceName].Active = this.Paused ? true : false;
        this.Playing = this.Paused ? true : false;
        this.Paused = this.Paused ? false : true;
    }

    return this;
};



/*
 * ResumeSequence
 * @sequenceName: the name of the sequence to pause
*/
Duedo.SpriteSheet.prototype.ResumeSequence = function ( sequenceName ) {

    sequenceName = sequenceName || this.ActiveSequence;

    if( typeof sequenceName !== "undefined" )
    {
        this._Sequences[sequenceName].Active = true;
        this.Playing = true;
        this.Paused = false;
    }


    return this;
};



/*
 * FrameWidth | meters
 * @public
 * return current frame width
*/
Duedo.SpriteSheet.prototype.FrameWidth = function() {
    return (this.CurrentFrame()[2] * this.Scale.X);
};




/*
 * FrameHeight | meters
 * @public
 * return current frame height
*/
Duedo.SpriteSheet.prototype.FrameHeight = function() {
    return (this.CurrentFrame()[3] * this.Scale.Y);
};



/*
 * CurrentFrame
 * @public
 * Return current running frame
*/
Duedo.SpriteSheet.prototype.CurrentFrame = function() {
    var frame   = this.ActiveSS();
    return frame.Frames[frame.FrameIndex];
};



/*
 * PostUpdate
*/
Duedo.SpriteSheet.prototype.PostUpdate = function(deltaT) {

    if(this.Body) {
        var bpos = this.Body.GetPosition();
        this.Location.X = bpos.x;
        this.Location.Y = bpos.y;
        this.Rotation = this.Body.GetAngle();
    }


    /*Animations are Rate-independent*/
    this.UpdateAnimations(deltaT);

    /*Renderable*/
    this.Renderable = (this.Game.Viewport.Intersects(
        new Duedo.Rectangle(
            !this.FixedToViewport 
                ? 
                    new Duedo.Vector2((this.Location.X - this.Width * this.Anchor.X), (this.Location.Y - this.Height * this.Anchor.Y)) 
                : 
                    new Duedo.Vector2(this.ViewportOffset.X / this.Game.Viewport.Zoom + this.Game.Viewport.View.Location.X, this.ViewportOffset.Y / this.Game.Viewport.Zoom + this.Game.Viewport.View.Location.Y),
            DToPixels(this.FrameWidth()),
            DToPixels(this.FrameHeight()))
    ) && this.Alpha > 0);
    
    //Update location if it's fixed to viewport
    if(this.FixedToViewport)
    {
        this.Location.X = this.Game.Viewport.View.Location.X * this.Game.Viewport.Zoom + this.ViewportOffset.X;
        this.Location.Y = this.Game.Viewport.View.Location.Y * this.Game.Viewport.Zoom + this.ViewportOffset.Y;
    }
    
};




/*
 * Draw
 * @context: the context in use
 * draw the spritesheet on the screen
*/
Duedo.SpriteSheet.prototype.Draw = function ( context , location) {

    if (this.ActiveSequence === null || !this.Renderable || this.Alpha === 0 )
    {
        return this;
    }
       
    var frame;
    var scaledDim;
    var fc;
    var drawLoc = location !== undefined ? location : this.Location;

    /*Single frame origin*/
    fc = this.CurrentFrame();
    fc[0] = Math.max(1, fc[0]);
    fc[1] = Math.max(1, fc[1]);

    context.save();
    context.globalAlpha = this.Alpha * this.Game.World.Alpha;
    
    /*
     * Rotate if needed
    */    
    if( this.Rotation !== 0 ) {
        
        var ScaledWidth  = this.FrameWidth();
        var ScaledHeight = this.FrameWidth();

        /*Get center based on PixelsInMeter and dimension*/
        var mLocation = this.Location.Clone()
            .MultiplyScalar(Duedo.Conf.PixelsInMeter)
            .Subtract(new Duedo.Vector2(this.HalfWidth, this.HalfHeight))
            .Add(
                new Duedo.Vector2((ScaledWidth * this.Anchor.X), (ScaledHeight * this.Anchor.Y))
            );
        
        context.translate(mLocation.X, mLocation.Y);
        context.rotate(Duedo.Units.DegToRadians(this.Rotation));
        context.translate(-(mLocation.X), -(mLocation.Y));
    }

    if(this.BlendMode)
        context.globalCompositeOperation = this.BlendMode;

    if(this.FixedToViewport && !Duedo.Conf.ScaleFixedToViewportOnZoom) {
        context.scale(this.Game.Viewport.ZoomMin / this.Game.Viewport.Zoom, this.Game.Viewport.ZoomMin / this.Game.Viewport.Zoom);
    }

    /*Draw*/
    try
    {
        context.drawImage(
            this.Source,
            fc[0], fc[1],
            DToPixels(fc[2]), DToPixels(fc[3]),
            // Location
            DToPixels(drawLoc.X) - DToPixels(this.Width * this.Anchor.X),
            DToPixels(drawLoc.Y) - DToPixels(this.Height * this.Anchor.Y),
            DToPixels(this.FrameWidth()), DToPixels(this.FrameHeight())
        ); 
                            
    }
    catch (error)
    {
        throw error;
    }

    if(this.Debug) {
        // Draw wrapper
        context.beginPath();
        context.strokeStyle = 'red';
        context.rect(
            DToPixels(drawLoc.X) - DToPixels(this.Width * this.Anchor.X),
            DToPixels(drawLoc.Y) - DToPixels(this.Height * this.Anchor.Y), 
            DToPixels(this.FrameWidth()),
            DToPixels(this.FrameHeight())
        );
        context.stroke();
        // Draw center
        context.beginPath();
        const centerSize = 1;
        context.rect(
            DToPixels(drawLoc.X),
            DToPixels(drawLoc.Y), centerSize, centerSize);
        context.fillStyle = "black";
        context.fill();
        context.font = '12px arial';
        context.fillStyle = 'red';
        context.fillText(`Sprite X:${this.Location.X.toFixed(0)} Y:${this.Location.Y.toFixed(0)}`, 
            DToPixels(this.Location.X) - DToPixels(this.Width * 0.5), 
            DToPixels(this.Location.Y - 0.5) - DToPixels(this.Height * 0.5)
        );
    }

    context.restore();
    
    return this;
};





/*
 * DrawGL
 * @context: the context in use
 * draw the spritesheet on the screen
*/
Duedo.SpriteSheet.prototype.DrawGL = function(context) {
}




/*
 * HalfWidth
*/
Object.defineProperty(Duedo.SpriteSheet.prototype, "HalfWidth", {

    get: function () {
        return (this.FrameWidth() / 2);
    }

});




/*
 * HalfHeight
*/
Object.defineProperty(Duedo.SpriteSheet.prototype, "HalfHeight", {

    get: function () {
        return (this.FrameHeight() / 2);
    }

});




/*
 * Height
*/
Object.defineProperty(Duedo.SpriteSheet.prototype, "Height", {

    get: function () {
        return this.FrameHeight();
    }

});



/*
 * Width
*/
Object.defineProperty(Duedo.SpriteSheet.prototype, "Width", {

    get: function () {
        return this.FrameWidth();
    }

});



/*
 * Center
*/
Object.defineProperty(Duedo.SpriteSheet.prototype, "Center", {

    get: function () {
        return new Duedo.Vector2(this.Location.X + this.HalfWidth, this.Location.Y + this.HalfHeight);
    }

});


/*
 * IsPause
*/
Object.defineProperty(Duedo.SpriteSheet.prototype, "IsPaused", {

    get: function () {
        return this.Paused;
    }

});