/*
==============================
Duedo.PhysicsEngine
Author: http://www.edoardocasella.it

This Physics manager uses:
/**
* matter-0.8.0.js 0.8.0-alpha 2014-05-04
* http://brm.io/matter-js/
* Copyright (c) 2014 Liam Brummitt
* License: MIT

Matter.js reference site: http://brm.io/matter-js-docs/index.html


*
* Triggerable events:
* beforeUpdate
* afterUpdate
* To add an event use: AddEvent("afterUpdate", callbackFunction);
* 
* TOFIX:
* The physics engine work within one instance of gameContext (you can use the physics engine in only one game at time)
* I riferimenti agli strumenti di Matter.js non sono nuove istanze
==============================
*/

/*
 * Bodies @options
    type: 'body',
    label: 'Body',
    angle: 0,
    draggable: true, 
    preventRotation: false,
    vertices: Vertices.fromPath('L 0 0 L 40 0 L 40 40 L 0 40'),
    position: { x: 0, y: 0 },
    force: { x: 0, y: 0 },
    torque: 0,
    positionImpulse: { x: 0, y: 0 },
    constraintImpulse: { x: 0, y: 0, angle: 0 },
    speed: 0,
    angularSpeed: 0,
    velocity: { x: 0, y: 0 },
    angularVelocity: 0,
    isStatic: false,
    isSleeping: false,
    motion: 0,
    sleepThreshold: 60,
    density: 0.001,
    restitution: 0,
    friction: 0.1,
    frictionAir: 0.01,
    groupId: 0,
    slop: 0.05,
    timeScale: 1,
*/



Duedo.PhysicsEngine = function(gameContext, options) {
	this.PhysicsEngine = "matter";
	this.Game = gameContext || Duedo.Global.Games[0];

    //Matter/Duedo overrides
    this._SetMatterOverrides();

    /*Matter.js shortcuts*/
    this.Engine           = Matter.Engine;
    this.Bodies           = Matter.Bodies;
    this.World            = Matter.World;
    this.Body             = Matter.Body;
    this.Composites       = Matter.Composites;
    this.Composite        = Matter.Composite;
    this.Query            = Matter.Query;
    this.Pairs            = Matter.Pairs;

    this.MouseConstraint  = null;
    this._MouseConstraint = Matter.MouseConstraint;

    this.Events           = Matter.Events;
    this.Mouse            = Matter.Mouse;
    this.Common           = Matter.Common;
    this.Render           = Matter.Render;
    this.Metrics          = Matter.Metrics;
    this.Constraint       = Matter.Constraint;
    this.Sleeping         = Matter.Sleeping;
    this.Pairs            = Matter.Pairs;
    this.Resolver         = Matter.Resolver;
    this._SceneEvents     = [];


    /*Debug*/
    this.Debug = false;

    /*QuadTree - if enabled by calling PhysicEngine.UseQuadTree()*/
    this.QuadTree = null;

    /*BodiesLists - stores all the bodies*/
    this.BodiesLists = {};

    /*Private vars*/
    this._Engine;
    this._World;
	this._MouseConstraint;
	this._SceneEvents;

	this._init(options);
};



/*
 * _SetMatterOverrides
 * @private
 * Adapts Matter.js functions to the Duedo engine
*/
Duedo.PhysicsEngine.prototype._SetMatterOverrides = function() {

    //[!] Valid for this game instance only
    var Game = this.Game;

    /*
     * .contains must depends from the rendering translation
    */
    Matter.Bounds.contains = function(bounds, point) { 
        return point.x >= bounds.min.x - Game.Viewport.View.Location.X && point.x <= bounds.max.x  - Game.Viewport.View.Location.X
            && point.y >= bounds.min.y - Game.Viewport.View.Location.Y && point.y <= bounds.max.y  - Game.Viewport.View.Location.Y;
    };

    Matter.Vertices.contains = function(vertices, point) {
        for (var i = 0; i < vertices.length; i++) {
            var vertice = vertices[i],
                nextVertice = vertices[(i + 1) % vertices.length];
            if ((point.x - (vertice.x  - Game.Viewport.View.Location.X)) * ((nextVertice.y - Game.Viewport.View.Location.Y) - (vertice.y - Game.Viewport.View.Location.Y)) + 
                (point.y - (vertice.y - Game.Viewport.View.Location.Y)) * ((vertice.x  - Game.Viewport.View.Location.X) - (nextVertice.x  - Game.Viewport.View.Location.X)) > 0) {
                return false;
            }
        }

        return true;
    };



};




/*
 * _init
*/
Duedo.PhysicsEngine.prototype._init = function(options) {

	var options = {
        positionIterations: 6,
        velocityIterations: 4,
        enableSleeping: false,
    };
    
    /*Create a Matter.js engine*/
	this._Engine = this.Engine.create(document.body, {
		  render: {
		  	canvas: this.Game.Renderer.Canvas,
		  }
	});

    /*Get a reference to the physics world*/
    this._World = this._Engine.world;

    /*Set up physics world bounds*/
    this.SetWorldBounds(
        this.Game.World.Bounds.Location.X,
        this.Game.World.Bounds.Location.Y,
        this.Game.World.Bounds.Width,
        this.Game.World.Bounds.Height
    );

    //Initially disabled
    this.Enabled = false;
    
};	



/*
 * UseQuadTree
 * Request the QuadTree for collision detection
 * This must be called  before any body insertions
*/
Duedo.PhysicsEngine.prototype.UseQuadTree = function(bounds) {
    
    if(!this.QuadTree) 
    {

        var locStart = this.Game.World.Bounds.GetAsVector();
        var width    = this.Game.World.Bounds.Width;
        var height   = this.Game.World.Bounds.Height;

        return this.QuadTree = new Duedo.QuadTree(this.Game, 0, bounds || new Duedo.Rectangle(locStart, width, height));
    }
    
};



/*
 * StartMouseConstraint
 * @public
 * Start a mouse constraint. We'll be able to drag the bodies using the mouse
*/
Duedo.PhysicsEngine.prototype.StartMouseConstraint = function(stiffness, angularStiffness) {

    // add a mouse controlled constraint
    this.MouseConstraint = this._MouseConstraint.create(this._Engine);

    //Configure
    this.MouseConstraint.constraint.stiffness        = stiffness || 1;
    this.MouseConstraint.constraint.angularStiffness = angularStiffness || 1;

    //Add MouseConstraint
    this.World.add(this._Engine.world, this.MouseConstraint);

    
    return this.MouseConstraint;
};



/*
 * RectangleBody
 * @public
 * Return a rectangle body
 * @param: options {}
*/
Duedo.PhysicsEngine.prototype.RectangleBody = function(Location, Width, Height, Options) {
    return this.Bodies.rectangle(Location.X, Location.Y, Width, Height, Options);
};



/*
 * CircleBody
 * @public
 * Return a circle body
*/
Duedo.PhysicsEngine.prototype.CircleBody = function(Location, Radius, Options) {
    return this.Bodies.circle(Location.X, Location.Y, Radius, Options);
};



/*
 * PolygonBody
 * @public
 * Return a polygon body
*/
Duedo.PhysicsEngine.prototype.PolygonBody = function(Location, Sides, Radius, Options) {
    return this.Bodies.polygon(Location.X, Location.Y, Sides, Radius, Options);
};



/*
 * TrapezoidBody
 * @public
 * Return a trapezoid body
*/
Duedo.PhysicsEngine.prototype.TrapezoidBody = function(Location, Width, Height, Slope, Options) {
    return this.Bodies.trapezoid(Location.X, Location.Y, Width, Height, Slope, Options);
};



/*
 * SetGravity
 * @public
 * Set world gravity
*/
Duedo.PhysicsEngine.prototype.SetGravity = function(x, y) {
    this._Engine.world.gravity.x = x || 0;
    this._Engine.world.gravity.y = y || 1;
};



/*
 * World
 * @public
 * Return world reference
*/
Duedo.PhysicsEngine.prototype.World = function() {
    return this._World;
};



/*
 * SetWorldBounds
 * @public
 * Modify physics world bounds.
 * These should be equal to the size of the game world
*/
Duedo.PhysicsEngine.prototype.SetWorldBounds = function(minX, minY, maxX, maxY) {
    this._World.bounds.min.x = minX || 0;
    this._World.bounds.min.y = minY || 0;
    this._World.bounds.max.x = maxX || 0;
    this._World.bounds.max.y = maxY || 0;
};



/*
 * AddEngineEvent
 * @public
 * Add a triggerable event to this physics engine
 * Triggerables strings are: "afterUpdate", "beforeUpdate"
*/
Duedo.PhysicsEngine.prototype.AddEngineEvent = function(stringTrigger, callback) {
    this.Events.on(this._Engine, stringTrigger, callback);
};



/*
 * AddWorldEvent
 * @public
 * Add a triggerable event to this physics world
 * Triggerables strings are: ex: "collisionStart", "collisionActive", "collisionEnd"
*/
Duedo.PhysicsEngine.prototype.AddWorldEvent = function(stringTrigger, callback) {
    this.Events.on(this._Engine.world, stringTrigger, callback);
};




/*
 * AddMouseConstraintEvent
 * @public
 * Add a triggerable event to the MouseConstraint object
 * Triggerables strings are: "mouseup", "mousedown", "mousemove"
*/
Duedo.PhysicsEngine.prototype.AddMouseConstraintEvent = function(stringTrigger, callback) {
    this.Events.on(this.MouseConstraint, stringTrigger, callback);
};




/*
 * PreUpdate
*/
Duedo.PhysicsEngine.prototype.PreUpdate = function(deltaT, correction) {

    if(!this._Engine.enabled)
        return;

    //ADD::rimuovi corpi il cuo owner è stato distrutto
    

    /*Calculate Matter.js deltaT from Duedo deltaT*/
    var timing = this._Engine.timing;
    var dt = 0;

    //Duedo timing to Matter timing
    dt = deltaT * 1000;

    //limit delta (for Matter -> 1.0 = 1ms)
    dt = dt < timing.deltaMin ? timing.deltaMin : dt;
    dt = dt > timing.deltaMax ? timing.deltaMax : dt;

    /*Correction*/
    timing.correction = Duedo.Utils.IsNull(correction) ? 1 : correction;
    

    //update engine timing object
    timing.delta = dt;
    this._DeltaT = dt;

    this.Events.trigger(this._Engine, 'beforeTick', { timestamp: dt });
};



/*
 * Update
 * Main update
*/
Duedo.PhysicsEngine.prototype.Update = function(deltaT) {

    if(!this._Engine.enabled)
        return;

    //Call before tick events
    this.Events.trigger(this._Engine, 'beforeTick', { timestamp: this._DeltaT  });

    //Step physics
    this._StepPhysics(this._DeltaT, 1);

    //Call after tick events
    this.Events.trigger(this._Engine, 'afterTick', { timestamp: this._DeltaT  });

};



/*
 * _StepPhysics
 * @private
 * Physics final update
*/
Duedo.PhysicsEngine.prototype._StepPhysics = function(dt, correction) {

    var broadphase = this._Engine.broadphase[this._Engine.broadphase.current];
    var broadphasePairs = [];
    var i;

    // increment timestamp
    this._Engine.timing.timestamp += dt * this._Engine.timing.timeScale;
    this._Engine.timing.correction = correction;

    // create an event object
    var event = { timestamp: this._Engine.timing.timestamp };

    if(this.MouseConstraint !== null)
    {
        this._UpdateMouseContraintInfluence();
    }

    this.Events.trigger(this._Engine, 'tick', event);
    
    /*Retrieve bodies*/
    var allBodies = this.GetBodies(this.Game.StateManager.CurrentState());
    
    //test("Pengine 397" + allBodies.length);
    /*Retrive all constraints*/
    var allConstraints = this.Composite.allConstraints(this._World);

    // reset metrics logging
    this.Metrics.reset(this._Engine.metrics);

    // if sleeping enabled, call the sleeping controller
    if (this._Engine.enableSleeping)
        this.Sleeping.update(allBodies);

    // applies gravity to all bodies
    this.Body.applyGravityAll(allBodies, this._World.gravity);

    /*UPDATE PHASE*/
    this.Events.trigger(this._Engine, 'beforeUpdate', event);

    // update all body position and rotation by integration
    this.Body.updateAll(allBodies, dt, this._Engine.timing.timeScale, correction, this._World.bounds);

    // update all constraints
    for (i = 0; i < this._Engine.constraintIterations; i++) 
    {
        this.Constraint.solveAll(allConstraints, this._Engine.timing.timeScale);
    }

    this.Constraint.postSolveAll(allBodies);
    

    //BEGIN BROADPHASE
    this._Broadphase(broadphase, allBodies, event);

};





/*
 * _Broadphase
 * @private
 * Search for collisions
*/
Duedo.PhysicsEngine.prototype._Broadphase = function(broadphase, bodies, event) {

    // broadphase pass: find potential collision pairs
    if (broadphase.controller) 
    {
        // if world is dirty, we must flush the whole grid
        if (this._World.isModified)
            broadphase.controller.clear(broadphase.instance);

        // update the grid buckets based on current bodies
        broadphase.controller.update(broadphase.instance, bodies, this._Engine, this._World.isModified);
        broadphasePairs = broadphase.instance.pairsList;
    } 
    else 
    {
        // if no broadphase set, we just pass all bodies
        broadphasePairs = bodies;
    }

    // narrowphase pass: find actual collisions, then create or update collision pairs
    var collisions = broadphase.detector(broadphasePairs, this._Engine);

    //Begin narrowphase
    this._Narrowphase(collisions, bodies);
};




/*
 * _Narrowphase
 * @private
 * Resolve collisions
*/
Duedo.PhysicsEngine.prototype._Narrowphase = function(collisions, bodies, event) {

    // update collision pairs
    var pairs     = this._Engine.pairs;
    var timestamp = this._Engine.timing.timestamp;

    this.Pairs.update(pairs, collisions, timestamp);
    this.Pairs.removeOld(pairs, timestamp);

    // wake up bodies involved in collisions
    if (this._Engine.enableSleeping)
        this.Sleeping.afterCollisions(pairs.list);

    // iteratively resolve velocity between collisions
    this.Resolver.preSolveVelocity(pairs.list);
    for (i = 0; i < this._Engine.velocityIterations; i++) 
    {
        this.Resolver.solveVelocity(pairs.list, this._Engine.timing.timeScale);
    }
    
    // iteratively resolve position between collisions
    for (i = 0; i < this._Engine.positionIterations; i++) 
    {
        this.Resolver.solvePosition(pairs.list, this._Engine.timing.timeScale);
    }

    this.Resolver.postSolvePosition(bodies);

    // update metrics log
    this.Metrics.update(this._Engine.metrics, this._Engine);

    // clear force buffers
    this.Body.resetForcesAll(bodies);

    // clear all composite modified flags
    if (this._World.isModified)
        this.Composite.setModified(this._World, false, false, true);


    this.Events.trigger(this._Engine, 'afterUpdate', event);

};



/*
 * _UpdateMouseContraintInfluence 
 * @private
 * Update mouse constraint if enabled
*/
Duedo.PhysicsEngine.prototype._UpdateMouseContraintInfluence = function() {

    if(this.Game.InputManager.Mouse.Dragging)
        return;

    //FIX: BODIES GROUP
    var allBodies = this.Composite.allBodies(this._Engine.world);
    this._MouseConstraint.update(this.MouseConstraint, allBodies);



};



/*
 * ClearWorldDeep
 * @public
 * Clear physics world. Remove all the bodies
*/
Duedo.PhysicsEngine.prototype.ClearWorldDeep = function() {
    this.World.clear(this._World, false, true);
};



/*
 * AddBody
 * @public
 * Add a body shape to the physics world
*/
Duedo.PhysicsEngine.prototype.AddBody = function(body) {
    
    if(Duedo.Utils.IsNull(body) || body.Type !== Duedo.BODY)
    {
        return;
    }
    else
    {
        //Add a reference to himself
        body.Shape.DuedoBody = body;
        
        //Check the current game state
        var cState = this.Game.StateManager.CurrentState();
        if(cState === null)
        {
            //aggiungi dove?
        }

        //...if not exists as bodylist create a new composite group
        if(Duedo.Utils.IsNull(this.BodiesLists[cState]))
        {
            this.BodiesLists[cState] = this.CreateComposite("Composite_" + cState, null);      
        }

        var BodyGroup = this.BodiesLists[cState];

        //Add the body
        this.Composite.add(BodyGroup, body.Shape);
        
        //ADD: Se attivo un quadtree aggiorna quadtree
    }

};



/*
 * GetBodies
 * @public
 * Return bodies in the specified composite name
*/
Duedo.PhysicsEngine.prototype.GetBodies = function(compositeName) {
    
    if(Duedo.Utils.IsNull(this.BodiesLists[compositeName]))
        return [];

    return this.BodiesLists[compositeName].bodies;

};


/*
 * CreateBodiesList
 * @public
 * Create a Matter.Composite
*/
Duedo.PhysicsEngine.prototype.CreateComposite = function(name, options) {
    
    //Create new composite group
    var composite   =  this.Composite.create(options);
    composite.label = name;

    return composite;
};



/*
 * CastRay
 * @public
 * Cast a ray and return an array of collisions
*/
Duedo.PhysicsEngine.prototype.CastRay = function(bodiesArray,  duedoVec2_startPoint,  duedoVec2_endPoint,  n_rayWidth) {
    return this.Query.ray(bodiesArray,  duedoVec2_startPoint.ToGenericObject(),  duedoVec2_endPoint.ToGenericObject(),  n_rayWidth);
};



/*
 * BodiesInRegion
 * @public
 * Returns all bodies whose bounds are inside (or outside if set) the given set of bounds, 
 * from the given set of bodies.
 * @bodiesArray: array
 * @bounds: matter Bounds object
 * @outside: bool, if true return all the bodies inside the region, otherwise the externals (default: false)
 * return an array of collisions
*/
Duedo.PhysicsEngine.prototype.BodiesInRegion = function(bodiesArray,  bounds,  outside) {
    return this.Query.region(bodiesArray,  bounds,  outside);
};



/*
 * Enabled
 * @public
 * Set this physics engine as running or stopped {bool}
*/
Object.defineProperty(Duedo.PhysicsEngine.prototype, "Enabled", {
    set: function(value) {
        this._Engine.enabled = value;
    },
    get: function() {
        return this._Engine.enabled;
    }
});










/*
function duedoMain() { 

// Matter.js - http://brm.io/matter-js/

// Matter module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Common = Matter.Common,
    Composites = Matter.Composites,
    Composite = Matter.Composite,
    Events = Matter.Events,
    MouseConstraint = Matter.MouseConstraint;

    var scanvas = document.getElementById("screen2");

// create a Matter.js engine
var engine = Engine.create(scanvas, {
  render: {
    options: {
      showAngleIndicator: true,
      wireframes: true,
      canvas: scanvas
    }
  }
});

//engine.render.canvas = document.getElementById("screen2");

// add a mouse controlled constraint
var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);

var explosion = function(engine) {
    var bodies = Composite.allBodies(engine.world);

    for (var i = 0; i < bodies.length; i++) {
        var body = bodies[i];

        if (!body.isStatic && body.position.y >= 500) {
            var forceMagnitude = 0.05 * body.mass;

            Body.applyForce(body, { x: 0, y: 0 }, { 
                x: (forceMagnitude + Math.random() * forceMagnitude) * Common.choose([1, -1]), 
                y: -forceMagnitude + Math.random() * -forceMagnitude
            });
        }
    }
};

var timeScaleTarget = 1,
    counter = 20;

Events.on(engine, 'tick', function(event) {
    // tween the timescale for bullet time slow-mo
    engine.timing.timeScale += (timeScaleTarget - engine.timing.timeScale) * 0.05;

    counter += 1;

    // every 1.4 sec
    if (counter >= 60 * 1.4) {

        // flip the timescale
        if (timeScaleTarget < 1) {
            timeScaleTarget = 1;
        } else {
            timeScaleTarget = 0.05;
        }

        // create some random forces
        explosion(engine);

        // reset counter
        counter = 0;
    }
});

var bodyOptions = {
    frictionAir: 0, 
    friction: 0.0001,
    restitution: 0.8
};

// add some small bouncy circles... remember Swordfish?
World.add(engine.world, Composites.stack(20, 100, 15, 3, 20, 40, function(x, y, column, row) {
    return Bodies.circle(x, y, Common.random(10, 20), bodyOptions);
}));

// add some larger random bouncy objects
World.add(engine.world, Composites.stack(50, 50, 8, 3, 0, 0, function(x, y, column, row) {
    switch (Math.round(Common.random(0, 1))) {
        case 0:
            if (Math.random() < 0.8) {
                return Bodies.rectangle(x, y, Common.random(20, 50), Common.random(20, 50), bodyOptions);
            } else {
                return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(20, 30), bodyOptions);
            }
            break;
        case 1:
            return Bodies.polygon(x, y, Math.round(Common.random(4, 8)), Common.random(20, 50), bodyOptions);
    }
}));

// add some some walls to the world
var offset = 5;
World.add(engine.world, [
  Bodies.rectangle(400, -offset, 800 + 2 * offset, 50, { isStatic: true }),
  Bodies.rectangle(400, 600 + offset, 800 + 2 * offset, 50, { isStatic: true }),
  Bodies.rectangle(800 + offset, 300, 50, 600 + 2 * offset, { isStatic: true }),
  Bodies.rectangle(-offset, 300, 50, 600 + 2 * offset, { isStatic: true })
]);

// run the engine
Engine.run(engine);



}
*/