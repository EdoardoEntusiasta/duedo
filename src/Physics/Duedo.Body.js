/*
==============================
Duedo.Body
Author: http://www.edoardocasella.it


Notes:
This Duedo.Body object uses
/**
* matter-0.8.0.js 0.8.0-alpha 2014-05-04
* http://brm.io/matter-js/
* Copyright (c) 2014 Liam Brummitt
* License: MIT
* Matter.js reference site: http://brm.io/matter-js-docs/index.html

Complete references about body can be found at:
http://brm.io/matter-js-docs/classes/Body.html

==============================
*/

Duedo.Body = function(gameContext, owner) {
    this.Game = gameContext || Duedo.Global.Games[0];

	this.Type = Duedo.BODY;
	/*Owner game object of this body (ex: spritesheet)*/
	this.Owner;
	/*Main body object*/
	this.Shape;
	this.Scale;
	/*Contact callbacks*/
	this.OnCollisionStart;
	this.OnCollisionActive;
	this.OnCollisionEnd;

	/*Debug rendering options*/
	this.Debug = {
		/*Draw this body when is sleeping*/
		ShowSleeping:true,
		/*If true: draw the body center position*/
		BodyPosition:true,
		BodyPositionFillStyle: "rgba(255,165,0,0.8)",
		/*If true: draw this body as wireframes in debug mode*/
		Wireframes: true,
	}

	this._init(owner);	
};



/*
 * _init
*/
Duedo.Body.prototype._init = function(owner) {

	if(Duedo.Utils.IsNull(owner))
	{
		return null;
	}
	else
	{
		this.Owner = owner;
	}


	this._Scale = new Duedo.Vector2(1, 1);

};



/*
 * Link
 * @public
 * Influence the owner location and rotation
*/
Duedo.Body.prototype.Link = function(dt) {
	
	if(Duedo.Utils.IsNull(this.Shape) || !this.Game.PhysicsEngine.Enabled)
		return;

	/*Link the graphic object to his body*/
	this.Owner.Location.X = (this.Location.X - this.Owner.HalfWidth);
	this.Owner.Location.Y = (this.Location.Y - this.Owner.HalfHeight);

	/*Link angle*/
	this.Owner.Rotation = this.Angle;
};




/*
 * Location
 * Return the current position of the physic shape (!!the center)
*/
Object.defineProperty(Duedo.Body.prototype, "Location", {
	get:function() {
		return new Duedo.Vector2(this.Shape.position.x, this.Shape.position.y);
	}
});



/*
 * SetLocation
 * Modify location vector of this body
 * You can also modify it by setting mybody.shape.position.x/y properties
 * x can be a Duedo.Vector2 too
*/
Duedo.Body.prototype.SetLocation = function(x, y) {
	
	/*Duedo aggiunta in matter-0.8.0.js*/
	//return Matter.Body.setLocation(this.Shape, x, y);

	if(x instanceof Duedo.Vector2)
	{
		y = x.Y;
		x = x.X;
	}

	var prev = {};

	prev.x = this.Shape.position.x;
	prev.y = this.Shape.position.y;

	this.Shape.position.x = x;
	this.Shape.position.y = y;
	this.Shape.positionPrev.x = x;
	this.Shape.positionPrev.y = y;

	var translation = {x: this.Shape.position.x - prev.x, y: this.Shape.position.y - prev.y};

	Matter.Vertices.translate(this.Shape.vertices, translation);
	Matter.Bounds.update(this.Shape.bounds, this.Shape.vertices, this.Shape.velocity);

	return this;
};



/*
 * Rotate
 * Rotates a body by a given angle relative to its current angle, without imparting any angular velocity.
*/
Duedo.Body.prototype.Rotate = function(/*radians*/ angle) {
	Matter.Body.rotate(this.Shape, angle);
};


/*
 * Scale
 * Scales the body, including updating physical properties (mass, area, axes, inertia), from a world-space point (default is body centre).
*/
Duedo.Body.prototype.Scale = function(scaleDuedoVec, /*vector*/ point) {
	
	if(!Duedo.Utils.IsNull(point) && point instanceof Duedo.Vector2)
		point = point.ToGenericObject();

	Matter.Body.scale(this.Shape, scaleDuedoVec.X, scaleDuedoVec.Y, point);
};


/*
 * Centre
 * Return the centre vector of this body
*/
Object.defineProperty(Duedo.Body.prototype, "Centre", {

	get: function() {
		var centre = Matter.Vertices.centre(this.Vertices);
		return new Duedo.Vector2(centre.x, centre.y);
	}

});


/*
 * Vertices
 * Return the vertices of this body
*/
Object.defineProperty(Duedo.Body.prototype, "Vertices", {

	get: function() {
		return this.Shape.vertices;
	}

});


/*
 * Translate
 * Moves a body by a given vector relative to its current position, without imparting any velocity.
*/
Duedo.Body.prototype.Translate = function(x, y) {

	var translation;

	if(x instanceof Duedo.Vector2)
	{
		translation = {x: x.X, y: x.Y};
	}
	else
	{
		translation = {x: x, y: y};
	}

	Matter.Body.translate(this.Shape, translation);
};



/*
 * ApplyForce
 * Applies a force to a body from a given world-space position, including resulting torque
*/
Duedo.Body.prototype.ApplyForce = function(worldPositionDuedoVec, forceDuedoVec) {
	
	if(!Duedo.Utils.IsNull(worldPositionDuedoVec) && worldPositionDuedoVec instanceof Duedo.Vector2)
		worldPositionDuedoVec = worldPositionDuedoVec.ToGenericObject();
	else
	{
		worldPositionDuedoVec = {x: 0, y: 0};
	}

	Matter.Body.applyForce(this.Shape, worldPositionDuedoVec, forceDuedoVec.ToGenericObject());
};



/*
 * SetStatic
 * Sets the body as static, including isStatic flag and setting mass and inertia to Infinity.
*/
Duedo.Body.prototype.SetStatic = function(bool) {
	Matter.Body.setStatic(this.Shape, bool);
}



/*
 * Angle
 * A Number specifying the angle of the body, in radians.
*/
Object.defineProperty(Duedo.Body.prototype, "Angle", {
	get: function() {
		return this.Shape.angle;
	},
	set: function(value) {
		return this.Shape.angle = value;
	}
});



/*
 * AngularVelocity
 * A Number that measures the current angular velocity of the body after the last Body.update. 
 * It is read-only. If you need to modify a body's angular velocity directly, 
 * you should apply a torque or simply change the body's angle (as the engine uses position-Verlet integration).
*/
Object.defineProperty(Duedo.Body.prototype, "AngularVelocity", {
	get: function() {
		return this.Shape.angularVelocity;
	}
});



/*
 * AngularSpeed
 * A Number that measures the current angular speed of the body after the last Body.update. 
 * It is read-only and always positive (it's the magnitude of body.angularVelocity).
*/
Object.defineProperty(Duedo.Body.prototype, "AngularSpeed", {
	get: function() {
		return this.Shape.angularSpeed;
	}
});



/*
 * Area
 * A Number that measures the area of the body's convex hull, calculated at creation by Body.create.
*/
Object.defineProperty(Duedo.Body.prototype, "Area", {
	get: function() {
		return this.Shape.area;
	}
});



/*
 * Axes
 * An array of unique axis vectors (edge normals) used for collision detection. 
 * These are automatically calculated from the given convex hull (vertices array) in Body.create. 
 * They are constantly updated by Body.update during the simulation.
*/
Object.defineProperty(Duedo.Body.prototype, "Axes", {
	get: function() {
		return this.Shape.axes;
	}
});



/*
 * Density
 * A Number that defines the density of the body, that is its mass per unit area. 
 * If you pass the density via Body.create the mass property is automatically calculated 
 * for you based on the size (area) of the object. 
 * This is generally preferable to simply setting mass 
 * and allows for more intuitive definition of materials (e.g. rock has a higher density than wood).
 *
*/
Object.defineProperty(Duedo.Body.prototype, "Density", {
	get: function() {
		return this.Shape.density;
	},
	set: function(value) {
		return this.Shape.density = value;
	}
});



/*
 * Bounds
 * A Bounds object that defines the AABB region for the body. 
 * It is automatically calculated from the given convex hull (vertices array) in Body.create 
 * and constantly updated by Body.update during simulation.
*/
Object.defineProperty(Duedo.Body.prototype, "Bounds", {
	get: function() {
		return this.Shape.bounds;
	}
});



/*
 * Friction
 * A Number that defines the friction of the body. 
 * The value is always positive and is in the range (0, 1). 
 * A value of 0 means that the body may slide indefinitely. 
 * A value of 1 means the body may come to a stop almost instantly after a force is applied.
 * The effects of the value may be non-linear. 
 * High values may be unstable depending on the body. 
 * The engine uses a Coulomb friction model including static and kinetic friction. 
 * Note that collision response is based on pairs of bodies, and that friction values are combined with the following formula:
*/
Object.defineProperty(Duedo.Body.prototype, "Friction", {
	get: function() {
		return this.Shape.friction;
	},
	set: function(value) {
		return this.Shape.friction = value;
	}
});



/*
 * FrictionAir
 * A Number that defines the air friction of the body (air resistance). 
 * A value of 0 means the body will never slow as it moves through space. 
 * The higher the value, the faster a body slows when moving through space. 
 * The effects of the value are non-linear.
*/
Object.defineProperty(Duedo.Body.prototype, "FrictionAir", {
	get: function() {
		return this.Shape.frictionAir;
	},
	set: function(value) {
		return this.Shape.frictionAir = value;
	}
});



/*
 * GroupID
 * An integer Number that specifies the collision group the body belongs to. 
 * Bodies with the same groupId are considered as-one body and therefore do not interact. 
 * This allows for creation of segmented bodies that can self-intersect, such as a rope. 
 * The default value 0 means the body does not belong to a group, and can interact with all other bodies.
*/
Object.defineProperty(Duedo.Body.prototype, "GroupID", {
	get: function() {
		return this.Shape.groupId;
	},
	set: function(value) {
		return this.Shape.groupId = value;
	}
});



/*
 * Restitution
 * A Number that defines the restitution (elasticity) of the body. 
 * The value is always positive and is in the range (0, 1). 
 * A value of 0 means collisions may be perfectly inelastic and no bouncing may occur. 
 * A value of 0.8 means the body may bounce back with approximately 80% of its kinetic energy. 
 * Note that collision response is based on pairs of bodies, and that restitution values are combined with the following formula:
 * Math.max(bodyA.restitution, bodyB.restitution)
*/
Object.defineProperty(Duedo.Body.prototype, "Restitution", {
	get: function() {
		return this.Shape.restitution;
	},
	set: function(value) {
		return this.Shape.restitution = value;
	}
});



/*
 * Slop
 * A Number that specifies a tollerance on how far a body is allowed to 'sink' or rotate into other bodies. 
 * Avoid changing this value unless you understand the purpose of slop in physics engines. 
 * The default should generally suffice, although very large bodies may require larger values for stable stacking.
*/
Object.defineProperty(Duedo.Body.prototype, "Slop", {
	get: function() {
		return this.Shape.slop;
	},
	set: function(value) {
		return this.Shape.slop = value;
	}
});



/*
 * Draggable
 * Set this body as draggable by the mouse constraint
 * Default: true
*/
Object.defineProperty(Duedo.Body.prototype, "Draggable", {
	get: function() {
		return this.Shape.draggable;
	},
	set: function(value) {
		return this.Shape.draggable = value;
	}
});



/*
 * Torque
 * A Number that specifies the torque (turning force) to apply in the current step. It is zeroed after every Body.update.
*/
Object.defineProperty(Duedo.Body.prototype, "Torque", {
	get: function() {
		return this.Shape.torque;
	},
	set: function(value) {
		return this.Shape.torque = value;
	}
});



/*
 * IsStatic
 * A flag that indicates whether a body is considered static. 
 * A static body can never change position or angle and is completely fixed. 
 * If you need to set a body as static after its creation, you should use Body.setStatic 
 * as this requires more than just setting this flag.
*/
Object.defineProperty(Duedo.Body.prototype, "IsStatic", {
	get: function() {
		return this.Shape.isStatic;
	}
});



/*
 * Mass
 * A Number that defines the mass of the body, 
 * although it may be more appropriate to specify the density property instead. 
 * If you modify this value, you must also modify the body.inverseMass property (1 / mass).
*/
Object.defineProperty(Duedo.Body.prototype, "Mass", {
	get: function() {
		return this.Shape.mass;
	},

	set: function(mass) {
		this.Shape.mass = mass;
		this.Shape.inverseMass = 1 / mass;
	}
});



/*
 * InverseMass
 * A Number that defines the inverse mass of the body (1 / mass). 
 * If you modify this value, you must also modify the body.mass property.
*/
Object.defineProperty(Duedo.Body.prototype, "InverseMass", {
	get: function() {
		return this.Shape.inverseMass;
	},
	
	set: function(mass) {
		//FIX??
	}
});


/*
 * PreventRotation
 * bool
 * Prevent the body rotation
*/
Object.defineProperty(Duedo.Body.prototype, "PreventRotation", {

	get: function() {
		return this.Shape.preventRotation;
	},
	set: function(bool) {
		return this.Shape.preventRotation = bool;
	}

});


/*
 * DrawWireframe
 * @public
 * Draw body wireframe - ex:. when Duedo.PhysicsEngine.Debug is true
*/
Duedo.Body.prototype.Draw = function(context) {

	if(Duedo.Utils.IsNull(this.Shape))
		return;

	var body = this.Shape;

	if (!body.render.visible)
		return;
	

	if(this.Shape.circleRadius)
	{
		context.beginPath();
        context.arc(this.Shape.position.x, this.Shape.position.y, this.Shape.circleRadius, 0, 2 * Math.PI);
	}
	else
	{
		context.beginPath();

		context.moveTo(body.vertices[0].x, body.vertices[0].y);

		for (j = 1; j < body.vertices.length; j++) 
		{
	    	context.lineTo(body.vertices[j].x, body.vertices[j].y);
	    }
	            
	    context.lineTo(body.vertices[0].x, body.vertices[0].y);
	}


	/*Fill and stroke*/
    if (!this.Debug.Wireframes) 
    {
        if (this.Debug.ShowSleeping && this.Shape.isSleeping) 
        {
            context.fillStyle = Matter.Common.shadeColor(this.Shape.render.fillStyle, 50);
        } 
        else 
        {
            context.fillStyle = this.Shape.render.fillStyle;
        }

        context.lineWidth   = this.Shape.render.lineWidth;
        context.strokeStyle = this.Shape.render.strokeStyle;
        context.fill();
        context.stroke();
    } 
    else 
    {
        context.lineWidth = 1;
        context.strokeStyle = '#bbb';

        if (this.Debug.ShowSleeping && this.Shape.isSleeping)
            context.strokeStyle = 'rgba(255,255,255,0.2)';

        context.stroke();
    }


    if(this.Debug.BodyPosition)
    {
    	this.DrawBodyPosition(context);
    }

};



/*
 * DrawBodyPosition
 * @public
 * Draw the center position of this body
*/
Duedo.Body.prototype.DrawBodyPosition = function(context) {
	context.beginPath();
	context.arc(this.Shape.position.x, this.Shape.position.y, 3, 0, 2 * Math.PI, false);
    context.closePath();
    context.fillStyle = this.Debug.BodyPositionFillStyle;
    context.fill();
};