/*
==============================
Duedo.Parallax
Author: http://www.edoardocasella.it
==============================
*/


Duedo.Parallax = function (gameContext) {
    Duedo.GraphicObject.call(this);
    this.Game = gameContext || Duedo.Global.Games[0];
    this.Type = Duedo.PARALLAX;
    
    /*Distance from camera*/
    this.Distance = 4;
    /*This parallax velocity*/
    this.Velocity = 4;

    this.Layers = [];
    
    this._init();

};


/*Inherit graphic object*/
Duedo.Parallax.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Parallax.prototype.constructor = Duedo.Parallax;



/*
 * _init
*/
Duedo.Parallax.prototype._init = function () {
    this._super();

    // Anchor default
    this.Anchor.X = 0;
    this.Anchor.Y = 0;
};




/*
 * AddLayer
*/
Duedo.Parallax.prototype.AddLayer = function ( layer ) {
    
    if (Duedo.Utils.IsNull(layer) || !layer instanceof Duedo.Layer)
    {
        throw "Duedo.Parallax.addLayer: needs Duedo.Layer";
    }
    else
    {
        if(Duedo.Utils.IsNull(layer.Z) || layer.Z === 0)
        {
            layer.Z = (this.Z + this.Layers.length);
        }
        
        layer.Parent = this;

        // Inherit anchor
        layer.Source.Anchor.X = this.Anchor.X;
        layer.Source.Anchor.Y = this.Anchor.Y;

        // Inherit scale
        //layer.Source.Scale.X = this.Scale.X;
        //layer.Source.Scale.Y = this.Scale.Y;

        this.Layers.push(layer);

        /*...then free it into the world*/
        this.Game.Add(layer);
    }
    
    return this;

};



/*
 * Update
*/
Duedo.Parallax.prototype.Update = function ( deltaT ) {

    var relVel;
    var offset;

    offset = new Duedo.Vector2(0, 0);
    relVel = this.Distance;
    
    for (var i = this.Layers.length - 1; i >= 0; i--)
    {

        Layer = this.Layers[i];

        /*Translate layer*/
        if (this.Game.Viewport.Translation.Magnitude() > 0)
        {
            
            relVel = this.Velocity * (Layer.Z + 2);
            // Todo, zoom etc
            offset.X = ((this.Game.Viewport.Translation.X * relVel) / (this.Game.Viewport.View.Width));
            offset.Y = ((this.Game.Viewport.Translation.Y * relVel) / (this.Game.Viewport.View.Height / 2));

            /*Negate direction*/
            offset.Negate().MultiplyScalar(0.6);

            /*Translate layer*/
            Layer.Source.Location.X += offset.X;
            Layer.Source.Location.Y += offset.Y;

        }

        if(!Duedo.Utils.IsNull(Layer["Update"]))
        {
            Layer.Source.Update(deltaT);
        }
      
    }

};



/*
 * PostUpdate
*/
Duedo.Parallax.prototype.PostUpdate = function(deltaT) {

};











