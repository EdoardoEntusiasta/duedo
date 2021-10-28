/*
==============================
Duedo.ParticleSystem
Author: http://www.edoardocasella.it
Thanks to: mrspeaker.net && 71squared.com
view-source:http://www.mrspeaker.net/dev/parcycle/

==============================
*/


Duedo.ParticleSystem = function( gameContext, name ){
    Duedo.GraphicObject.call(this);
    this.Game = gameContext || Duedo.Global.Games[0];
    this.Type = Duedo.PARTICLE_SYSTEM;
    
    this._Parent;

    this.Initialized = false;

    /*Status*/
    this.MaxParticles = 300;
	this.Particles = [];
	this.Active = true;
	this.IsDead = true;

	/*Location random*/
	this.LocationRandom = new Duedo.Vector2(0, 0);

    /*Size*/
	this.Size = 15;
	this.SizeRandom = 30;

    /*Speed*/
	this.Speed = 0.1;
	this.SpeedRandom = 1.2;
	this.MaxSpeed = 2;

    /*Lifespan*/
	this.LifeSpan = 1;
	this.LifeSpanRandom = 2;

    /*Angle (rad) */
	this.Angle = 0;
	this.AngleRandom = Math.PI;

    /*Gravity*/
	this.Gravity = new Duedo.Vector2(0.0, 0.0);

    /*Texture*/
	this.Texture = null;
	this.TextureAlpha = 1;
	this.TextureDim = new Duedo.Dimension(20, 20);

    /*Colour*/
	this.StartColour        = [ 255, 255, 255, 1 ];
	this.StartColourRandom  = [ 10, 10, 10, 0.1 ];
	this.FinishColour       = [ 0, 0, 0, 0 ];  
	this.FinishColourRandom = [ 10, 10, 10, 0 ];

    /*Sharpness*/
	this.Sharpness = 1;
	this.SharpnessRandom = 5;

    /*Mass*/
	this.Mass = 2;
	this.MassRandom = 5;

    /*Timing*/
	this.ElapsedTime = 0;
	this.Duration = Infinity;

    /*Emission*/
	this.EmissionRate = 0;
	this.EmitCounter = 0;
	this.ParticleIndex = 0;
	this.ParticleCount = 0;

    /*Global composite operations*/
	this.BlendMode = Duedo.BlendModes.LIGHTER;


	this._init( name );
}




/*Inherit graphic object*/
Duedo.ParticleSystem.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.ParticleSystem.prototype.constructor = Duedo.ParticleSystem;


/*
Particle system bindable events
- death
- update
*/




/*
 * _init
 * @private
*/
Duedo.ParticleSystem.prototype._init = function ( name ) {
    this._super();


    this.EmissionRate = this.MaxParticles / this.LifeSpan;
    this.EmitCounter = 0;
    this.IsDead = false;
    this.Initialized = true;

    this.Width = ((this.Size + this.SizeRandom) / 2);
    this.Height = this.Width;

    this.Name = name || "particlesystem";

    return this;
};




/*
 * Activate
 * @public
 * Activate this ps
*/
Duedo.ParticleSystem.prototype.Activate = function () {
    this.Active = true;
    return this;
};







/*
 * Stop
 * @public
 * Stop this ps
*/
Duedo.ParticleSystem.prototype.Stop = function () {

    this.Active      = false;
    this.ElapsedTime = 0;
    this.EmitCounter = 0;


    return this;
};







/*
 * Load
 * @ublic
 * Load ps configuration from JSON data
*/
Duedo.ParticleSystem.prototype.Load = function ( configurationJSON ) {


    if( typeof configurationJSON === "undefined" )
    {
        return;
    }
    
    var cfg = JSON.parse(configurationJSON);

    if( typeof cfg["Properties"] !== "undefined" )
    {
        for( var index in cfg["Properties"] )
        {
            switch( index )
            {
                case "Location":
                case "LocationRandom":
                case "Gravity":
                    var vcoord = cfg["Properties"][index].replace(/\s/g, "").split(',');
                    this[index] = new Duedo.Vector2(Number(vcoord[0]), Number(vcoord[1])); 
                    break;

                case "Texture":
                    if( cfg["Properties"][index] instanceof Array )
                    {
                        
                        var tarray = [];

                        for( var i in cfg["Properties"][index] )
                        {
                            tarray.push(this.Game.Cache.GetImage(cfg["Properties"][index][i]));
                        }

                        this[index] = tarray;
                    }
                    else
                    {
                        this[index] = cfg["Properties"][index];
                    }
                    break;

                case "TextureDim":
                    var ddata = cfg["Properties"][index].replace(/\s/g, "").split(',');
                    this[index] = new Duedo.Dimension(Number(ddata[0]), Number(ddata[1]));
                    break;

                default:
                    this[index] = cfg["Properties"][index];
                    break;
                    
            }
        }
    }
    
    


};







/*
 * _AddParticle
 * @private
 * Add a particle to this ps
*/
Duedo.ParticleSystem.prototype._AddParticle = function () {

    if (this.ParticleCount == this.MaxParticles)
    {
        return false;
    }

    var /*Duedo.Particle*/ particle;

    particle = new Duedo.Particle(this.Game);

    this._InitParticle(particle);
    this.Particles[this.ParticleCount] = particle;


    this.ParticleCount++;



    return this;
};









/*
 * _InitParticle
 * @private
*/
Duedo.ParticleSystem.prototype._InitParticle = function (particle) {


    var newAngle, vector, vectorSpeed;

    particle._Parent = this;

    particle.StartTime = this.Game.ElapsedTime;

    particle.Location.X = this.Location.X + this.LocationRandom.X * Duedo.Utils.RandM1T1();
    particle.Location.Y = this.Location.Y + this.LocationRandom.Y * Duedo.Utils.RandM1T1();

    newAngle    = (this.Angle + this.AngleRandom * Duedo.Utils.RandM1T1());
    vector      = new Duedo.Vector2(Math.cos(newAngle), Math.sin(newAngle)); // Could move to lookup for speed
    vectorSpeed = this.Speed + this.SpeedRandom * Duedo.Utils.RandM1T1();


    vector.MultiplyScalar(vectorSpeed);
    particle.Velocity = vector;
    particle.MaxSpeed = this.MaxSpeed;

    particle.Alpha = this.TextureAlpha;
    particle.InitialAlpha = particle.Alpha;

    particle.Size       = this.Size + this.SizeRandom * Duedo.Utils.RandM1T1();
    particle.Size       = particle.Size < 0 ? 0 : ~~particle.Size;
    particle.Mass       = Duedo.Utils.RandInRange(this.Mass, this.MassRandom);
    particle.TimeToLive = this.LifeSpan + this.LifeSpanRandom * Duedo.Utils.RandM1T1();
    

    particle.Life = particle.TimeToLive;

    particle.Sharpness = this.Sharpness + this.SharpnessRandom * Duedo.Utils.RandM1T1();
    particle.Sharpness = particle.Sharpness > 100 ? 100 : particle.Sharpness < 0 ? 0 : particle.Sharpness;

    // internal circle gradient size - affects the sharpness of the radial gradient
    particle.SizeSmall = ~~((particle.Size / 200) * particle.Sharpness); //(size/2/100)

    var start =
    [
        this.StartColour[0] + this.StartColourRandom[0] * Duedo.Utils.RandM1T1(),
        this.StartColour[1] + this.StartColourRandom[1] * Duedo.Utils.RandM1T1(),
        this.StartColour[2] + this.StartColourRandom[2] * Duedo.Utils.RandM1T1(),
        this.StartColour[3] + this.StartColourRandom[3] * Duedo.Utils.RandM1T1()
    ];

    var end =
    [
        this.FinishColour[0] + this.FinishColourRandom[0] * Duedo.Utils.RandM1T1(),
        this.FinishColour[1] + this.FinishColourRandom[1] * Duedo.Utils.RandM1T1(),
        this.FinishColour[2] + this.FinishColourRandom[2] * Duedo.Utils.RandM1T1(),
        this.FinishColour[3] + this.FinishColourRandom[3] * Duedo.Utils.RandM1T1()
    ];


    particle.Colour = start;
    particle.DeltaColour[0] = (end[0] - start[0]) / particle.TimeToLive;
    particle.DeltaColour[1] = (end[1] - start[1]) / particle.TimeToLive;
    particle.DeltaColour[2] = (end[2] - start[2]) / particle.TimeToLive;
    particle.DeltaColour[3] = (end[3] - start[3]) / particle.TimeToLive;

    

    return this;
};




/*
 * PreUpdate
*/
Duedo.ParticleSystem.prototype.PreUpdate = function() {

};



/*
 * Update
 * @public
*/
Duedo.ParticleSystem.prototype.Update = function (deltaT) {
    this.SuperUpdate();
    
    var rate, p;
    
    /*Update linked animations*/
    this.UpdateAnimations(deltaT);

    if (this.Active && this.EmissionRate > 0)
    {

        rate = 1 / this.EmissionRate;

        this.EmitCounter += deltaT;

        while (this.ParticleCount < this.MaxParticles && this.EmitCounter > rate)
        {
            this._AddParticle();
            this.EmitCounter -= rate;
        }


        if (typeof deltaT !== "undefined")
        {
            this.ElapsedTime += deltaT;
        }


        if (!this.IsAlive)
        {
            this.Stop();
        }
        
    }

    
    this.ParticleIndex = 0;


    /*Check system death*/
    if (this.ParticleCount === 0 && this.Active === false)
    {
        this.IsDead = true;
        this.InUse = false;
        this._CallTriggers("death");
    }
    
    

    while (this.ParticleIndex < this.ParticleCount)
    {

        p = this.Particles[this.ParticleIndex];

        p.Update(deltaT);
        
        if (p.TimeToLive > 0)
        {
            this.ParticleIndex++;
        }
        else
        {
            // Replace particle with the last active 
            if (this.ParticleIndex != this.ParticleCount - 1)
            {
                this.Particles[this.ParticleIndex] = this.Particles[this.ParticleCount - 1];
            }

            this.ParticleCount--;

        }
    }
    

    this._CallTriggers("update");

    return this;

};




/*
 * PostUpdate
*/
Duedo.ParticleSystem.prototype.PostUpdate = function() {

    //Update location if it's fixed to viewport
    if(this.FixedToViewport)
    {
        this.Location.X = this.Game.Viewport.View.Location.X + this.ViewportOffset.X;
        this.Location.Y = this.Game.Viewport.View.Location.Y + this.ViewportOffset.Y;
    }
    
};




/*
 * Draw
 * @public
*/
Duedo.ParticleSystem.prototype.Draw = function ( context ) {

    context.save();


    if (this.BlendMode !== "")
    {
        context.globalCompositeOperation = this.BlendMode;
    }


    for (var i = 0, j = this.ParticleCount; i < j; i++)
    {

        var particle, size, halfSize, x, y, radgrad;

        particle = this.Particles[i];
        
        if( !particle.Renderable )
        {
            continue;
        }

        size = particle.Size;
        halfSize = size >> 1;

        x = ~~particle.Location.X;
        y = ~~particle.Location.Y;


        /*
            * Rotate if needed
        */    
        if( this.Rotation !== 0 )
        {
            context.translate(this.Location.X + (this.ScaledWidth * this.Anchor.X), this.Location.Y + (this.ScaledHeight * this.Anchor.Y));
            context.rotate(Duedo.Units.DegToRadians(this.Rotation));
            context.translate(-(this.Location.X +  (this.ScaledWidth * this.Anchor.X)), -(this.Location.Y + (this.ScaledHeight * this.Anchor.Y)));
        }
        
        if (this.Texture === null)
        {
            radgrad = context.createRadialGradient(x + halfSize, y + halfSize, particle.SizeSmall, x + halfSize, y + halfSize, halfSize);
            radgrad.addColorStop(0, particle.DrawColour);
            radgrad.addColorStop(1, 'rgba(0,0,0,0)'); //Super cool if you change these values (and add more colour stops)
            context.fillStyle = radgrad;
            context.fillRect(x, y, size, size);
        }
        else
        {
            /*Texturized particle system*/
            var width, height, tToDraw;

            width = this.TextureDim.Width;
            height = this.TextureDim.Height;

            /*Choice a random texture*/
            if (this.Texture instanceof Array)
            {
                tToDraw = this.Texture[Math.floor((Math.random() * (this.Texture.length)) + 0)];
            }
            else
            {
                tToDraw = this.Texture;
            }

            context.save();
            context.globalAlpha = particle.Alpha;
            context.drawImage(tToDraw, x - (width / 2), y - (height / 2), width, height);
            context.restore();
        }


        
    }



    context.restore();


    return this;
};






/*
 * IsAlive
 * @public
 * Check if this particle system is currently living
*/
Object.defineProperty(Duedo.ParticleSystem.prototype, "IsAlive", {

    get: function () {
        return (this.Duration > this.ElapsedTime);
    },

});