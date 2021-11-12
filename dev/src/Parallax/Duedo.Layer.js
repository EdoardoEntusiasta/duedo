/*
==============================
Duedo.Layer
Author: http://www.edoardocasella.it

* Default anchor for a parallax should be at O,O

==============================
*/


Duedo.Layer = function ( gameContext, image, anchor = new Duedo.Vector2(0, 0) ) {
    Duedo.GraphicObject.call(this);
    this.Game = gameContext || Duedo.Global.Games[0];
    this.Type = Duedo.LAYER;
    this.Parent;

    /**
     * Force repetition on X axis
     */
    this.RepeatX = true;
    this._init(image, anchor);
};


/*Inherit renderable*/
Duedo.Layer.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Layer.prototype.constructor = Duedo.Layer;


/*
 * _init
*/
Duedo.Layer.prototype._init = function( image, anchor) {
    this._super();

    if(!Duedo.Utils.IsNull(image))
    {
        this.Source = image;

        this.Source.Anchor = anchor;

        this._Width = this.Source.Width;
        this._Height = this.Source.Height;
    }

};



/*
 * Draw
 * ... and eventually loop horizontally
*/
Duedo.Layer.prototype.Draw = function(context2d, location = null, forceRender = false) {

    const targetLocation = location ? location : this.Source.Location;

    this.DrawLayer(this.Source, context2d, location ? location : this.Source.Location, forceRender);
    
    if(this.RepeatX && targetLocation.X - this.Game.Viewport.Location.X + this.Source.Width < this.Game.Viewport.Location.X + this.Game.Viewport.Width) {
        this.Draw(context2d, new Duedo.Vector2(targetLocation.X + this.Source.Width, targetLocation.Y), true);
    }
};



/*
 * DrawLayer
*/
Duedo.Layer.prototype.DrawLayer = function(source, context2d, location, forceRender = false) {
    source.Draw(context2d, location, forceRender);
};


/*
 * PreUpdate
*/
Duedo.Layer.prototype.PreUpdate = function(deltaT) {
    if(this.Source.PreUpdate) {
        this.Source.PreUpdate(deltaT);
    }
};



/*
 * Update
*/
Duedo.Layer.prototype.Update = function(deltaT) {
    if(this.Source.Update) {
        this.Source.Update(deltaT);
    }
};



/*
 * PostUpdate
*/
Duedo.Layer.prototype.PostUpdate = function(deltaT) {
    if(this.Source.PostUpdate) {
        this.Source.PostUpdate(deltaT);
    }
};



/*
 * Width
 * @public
 * Width of this layer that is the width of the graphic resource
*/
Object.defineProperty(Duedo.Layer.prototype, "Width", {
    get:function() {
        return this._Width;
    }
});



/*
 * Height
 * @public
 * Height of this layer that is the height of the graphic resource
*/
Object.defineProperty(Duedo.Layer.prototype, "Height", {
    get:function() {
        return this._Height;
    }
});

