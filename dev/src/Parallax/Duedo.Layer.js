/*
==============================
Duedo.Layer
Author: http://www.edoardocasella.it
==============================
*/


Duedo.Layer = function ( gameContext, image ) {
    Duedo.GraphicObject.call(this);
    this.Game = gameContext || Duedo.Global.Games[0];
    this.Type = Duedo.LAYER;
    this.Parent;
    this._init(image);
};


/*Inherit renderable*/
Duedo.Layer.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Layer.prototype.constructor = Duedo.Layer;


/*
 * _init
*/
Duedo.Layer.prototype._init = function( image ) {
    this._super();

    if(!image instanceof Duedo.Image) {
        image = new Duedo.Image(this.Game, image);
    }

    if(!Duedo.Utils.IsNull(image))
    {
        this.Source = image;

        /*FIX:: SE E' UNA SPRITESHEET LA DIMENSIONE E' QUELLA DEL FRAME*/
        this._Width = this.Source.Width;
        this._Height = this.Source.Height;
    }

};



/*
 * Draw
*/
Duedo.Layer.prototype.Draw = function(context2d) {
    this.DrawLayer(this.Source, context2d, this.Source.Location);
};



/*
 * DrawLayer
*/
Duedo.Layer.prototype.DrawLayer = function(source, context2d, location) {
    source.Draw(context2d, location);
};




/*
 * Width
 * @public
 * Width of this image
*/
Object.defineProperty(Duedo.Layer.prototype, "Width", {
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
Object.defineProperty(Duedo.Layer.prototype, "Height", {
    get:function() {
        return this._Height * this.Scale.Y;
    },
    set:function(val) {
        this.Scale.Y = val / this._Height;
        this._Height = val;
    }

});

