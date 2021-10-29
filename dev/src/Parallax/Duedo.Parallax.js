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
    this.Velocity = 3;

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
        if(Duedo.Utils.IsNull(layer.Source.Z) || layer.Source.Z === 0)
        {
            layer.Source.Z = (this.Z + this.ChildrenList.List.length);
        }
        
        layer.Parent = this;
        /*Get a reference to the layer*/
        this.ChildrenList.Add(layer);
        /*...then free it into the world*/
        this.Game.Add(layer.Source);
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
    
    for (var i = this.ChildrenList.List.length - 1; i >= 0; i--)
    {

        Layer = this.ChildrenList.List[i];

        /*Translate layer*/
        if (this.Game.Viewport.Translation.Magnitude() > 0)
        {
            
            relVel = this.Velocity * (Layer.Source.Z + 1);
            
            offset.X = ((this.Game.Viewport.Translation.X * relVel) / (this.Game.Viewport.View.Width));
            offset.Y = ((this.Game.Viewport.Translation.Y * relVel) / (this.Game.Viewport.View.Height / 2));

            /*Negate direction*/
            offset.Negate();

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











