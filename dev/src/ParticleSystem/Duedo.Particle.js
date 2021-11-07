/*
==============================
Duedo.Particle
Author: http://www.edoardocasella.it
==============================
*/


Duedo.Particle = function (gameContext) {
    Duedo.GraphicObject.call(this);
    this.Game = gameContext || Duedo.Global.Games[0];
    this.TYPE = Duedo.PARTICLE;
    
    /*Parent particle system*/
    this._Parent;

    /*Particle current direction*/
    this.Velocity = new Duedo.Vector2(0, 0);
    this.Acceleration = new Duedo.Vector2(0, 0);
    this.MaxSpeed = 1;

    /*Particle size*/
    this.Size = 0;
    this.SizeSmall = 0;
    this.Mass;

    /*As "born" time*/
    this.StartTime;

    /*Lifespan*/
    this.Life;
    this.TimeToLive = 0;

    /*Alpha - texturized particle*/
    /*this.Alpha already defined in GraphicObject*/
    this.InitialAlpha;

    /*RGBA colour*/
    this.Colour = [];

    this.DrawColour = "";

    this.DeltaColour = [];

    this.Sharpness = 0;

    /*Init particle*/
    this._init();
}



/*Inherit graphic object*/
Duedo.Particle.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Particle.prototype.constructor = Duedo.Particle;


Duedo.Particle.prototype._init = function () {
    return this._super();
};



/*Main update*/
Duedo.Particle.prototype.Update = function ( deltaT ) {

    /*FIX: ADD deltaT*/
    //Apply gravity
    this.ApplyForce(this._Parent.Gravity.Clone().MultiplyScalar(this.Mass));

    this.Velocity.Add(this.Acceleration);
    this.FixVelocity();
    
    this.Location.Add(this.Velocity);


    this.TimeToLive -= deltaT;

    if (this._Parent.Texture !== null)
    {
        this._UpdateTexturizedParticle( deltaT );
    }
    else
    {
        this._UpdateSimpleParticle( deltaT );
    }


    this.Renderable = this.CheckViewportIntersection();

    return this;
};




/*
 * Update texturized particle
*/
Duedo.Particle.prototype._UpdateTexturizedParticle = function ( deltaT ) {


    /*Update texture alpha*/
    this.Alpha = this.InitialAlpha - (this.Game.ElapsedTime - this.StartTime) / this.Life;

    this.Alpha *= this.Game.World.Alpha;


    if (this.Alpha <= 0)
    {
        this.Alpha = 0;
        this.Renderable = false;
    }
       

    return this;

};




/*
* Update simple particle
*/
Duedo.Particle.prototype._UpdateSimpleParticle = function ( deltaT ) {

    var r, g, b, a;
    var draw;


    r = this.Colour[0] += (this.DeltaColour[0] * deltaT);
    g = this.Colour[1] += (this.DeltaColour[1] * deltaT);
    b = this.Colour[2] += (this.DeltaColour[2] * deltaT);
    a = this.Colour[3] += (this.DeltaColour[3] * deltaT);


    draw = [];

    draw.push("rgba(" + (r > 255 ? 255 : r < 0 ? 0 : ~~r));
    draw.push(g > 255 ? 255 : g < 0 ? 0 : ~~g);
    draw.push(b > 255 ? 255 : b < 0 ? 0 : ~~b);

    /*Adjust by world alpha*/
    a *= this.Game.World.Alpha;

    draw.push((a > 1 ? 1 : a < 0 ? 0 : a.toFixed(2)) + ")");

    this.DrawColour = draw.join(",");


    return this;

};



/*
 * Apply force
*/
Duedo.Particle.prototype.ApplyForce = function ( vec2 ) {
    this.Acceleration.Add( vec2.DivideScalar(this.Mass) );
};




/*
 * Fix velocity
*/
Duedo.Particle.prototype.FixVelocity = function () {
    
    var toFix = ["X", "Y"];

    for( var i in toFix )
    {
        if (this.Velocity[toFix[i]] < -this.MaxSpeed)
            this.Velocity[toFix[i]] = -this.MaxSpeed;

        if (this.Velocity[toFix[i]] > this.MaxSpeed)
            this.Velocity[toFix[i]] = this.MaxSpeed;
    }
};




/*
 * Check viewport intersection
*/
Duedo.Particle.prototype.CheckViewportIntersection = function () {
    
    var pBBox = null;
    // ! TODO FIXA IN BASE A ZOOM
    /*Particle visibility*/
    if (this._Parent.Texture !== null)
    {
        pBBox = new Duedo.Rectangle(this.Location, this._Parent.TextureDim.Width, this._Parent.TextureDim.Height);
    }
    else
    {
        /*Viewport "intersection test" expects a size of at least 1*/
        pBBox = new Duedo.Rectangle(this.Location, this.Size || 1, this.Size || 1);
    }


    return this.Game.Viewport.Intersects(pBBox);

};