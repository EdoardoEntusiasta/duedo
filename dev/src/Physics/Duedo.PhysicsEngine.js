/*
==============================
Duedo.PhysicsEngine
Author: http://www.edoardocasella.it

This Physics manager uses:
/**
* Box2d 
* Copyright (c) 2006-2007 Erin Catto http://www.gphysics.com


*
* Triggerable events:
* beforeUpdate
* afterUpdate
* To add an event use: AddEvent("afterUpdate", callbackFunction);
* 
==============================
*/


/*
 * PhysicsEngine
*/
Duedo.PhysicsEngine = function(gameContext, options) {
	this.PhysicsEngine = "box2d";
	this.Game = gameContext || Duedo.Global.Games[0];

    this.FixDef = null;

    this.Conf = {
        AllowSleep:false,
        Gravity: new Duedo.Vector2(0, 10),
        VelocityCorrection: 8,
        PositionCorrection: 3
    };

    this._FixDefDefault = {
        density: 1.0,    // kg/m^2
        friction: 0.5,
        restitution:0.2, // [0.. 1]
        isSensor:false,
        isStatic: false
    };

    this.World = null;

    this.Enabled = true;

    /*
     * @private
    */
    this._Debug = false;

	this._init(options);
};


/*
 * _init
*/
Duedo.PhysicsEngine.prototype._init = function(options) {
    
    if(!this.Enabled)
        return;

	this.World = new b2World(
        new b2Vec2(this.Conf.Gravity.X, this.Conf.Gravity.Y), //gravity
        this.Conf.AllowSleep
    );

};	


/*
* RectBody
*/
Duedo.PhysicsEngine.prototype.RectBody = function(position, halfWidth, halFheight, options) {

    options = Duedo.Extend(options, this._FixDefDefault);

    var fixDef
    , bodyDef
    , body;

    /*Fixture*/
    fixDef             = new b2FixtureDef;
    fixDef.density     = options.density;
    fixDef.friction    = options.friction;
    fixDef.restitution = options.restitution;
    fixDef.isSensor    = options.isSensor;

    /*Body def*/
    bodyDef = new b2BodyDef; 

    bodyDef.type = options.isStatic ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;

    /*position: in meters*/
    bodyDef.position.x = position.X;
    bodyDef.position.y = position.Y;
       
    fixDef.shape = new b2PolygonShape;

    // Notice that the parameters of SetAsBox are the 'half-width' and 'half-height' of the box
    // and it is centered at the location of the body it gets attached to
    fixDef.shape.SetAsBox(halfWidth, halFheight);

    body = this.World.CreateBody(bodyDef).CreateFixture(fixDef);

    return body.GetBody();

};  


/*
 * CircleBody
*/
Duedo.PhysicsEngine.prototype.CircleBody = function(position, radius, options) {

    options = Duedo.Extend(options, this._FixDefDefault);

    var fixDef
    , bodyDef
    , body;

    /*Fixture*/
    fixDef             = new b2FixtureDef;
    fixDef.density     = options.density;
    fixDef.friction    = options.friction;
    fixDef.restitution = options.restitution;
    fixDef.isSensor    = options.isSensor;

    /*Body def*/
    bodyDef = new b2BodyDef; 

    bodyDef.type = options.isStatic ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;

    /*position: in meters*/
    bodyDef.position.x = position.X;
    bodyDef.position.y = position.Y;
       
    fixDef.shape = new b2CircleShape(radius || 1/*meters*/);
       
    body = this.World.CreateBody(bodyDef).CreateFixture(fixDef);

    return body.GetBody();
};


/*
 * PreUpdate
*/
Duedo.PhysicsEngine.prototype.PreUpdate = function(deltaT, correction) {

};



/*
 * Update
 * Main update
*/
Duedo.PhysicsEngine.prototype.Update = function(deltaT) {

    if(!this.Enabled)
        return;

   this._StepPhysics(deltaT, 1);
};



/*
 * _StepPhysics
 * @private
 * Physics final update
*/
Duedo.PhysicsEngine.prototype._StepPhysics = function(dt, correction) {
    this.World.Step(dt, this.Conf.VelocityCorrection, this.Conf.PositionCorrection);
};


/*
 * PostUpdate
*/
Duedo.PhysicsEngine.prototype.PostUpdate = function() {

    if(!this.Enabled)
        return;

    this.World.ClearForces();
};

/*
 * RenderDebugInfo
*/
Duedo.PhysicsEngine.prototype.RenderDebugInfo = function() {

    this.World.DrawDebugData(false);
};


/*
 * Debug
 * activate or deactivate debug rendering
*/
Object.defineProperty(Duedo.PhysicsEngine.prototype, "Debug", {

    set: function(val) {

        if(val === true) {
            //setup debug draw
            var debugDraw = new b2DebugDraw();
            debugDraw.SetSprite(document.getElementById("screen").getContext("2d"));
            debugDraw.SetDrawScale(30);
            debugDraw.SetFillAlpha(0.3);
            debugDraw.SetLineThickness(1.0);
            debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
            this.World.SetDebugDraw(debugDraw);
            this._Debug = true;
        }
    },

    get: function() {
        return this._Debug;
    }

});




var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
