/*
==========================================
Duedo.Circle
Author: http://www.edoardocasella.it
==========================================
*/
Duedo.Circle = function (v2, radius) {
    Duedo.Shape.call(this);
    this.Type = Duedo.CIRCLE;
    this.Radius = radius || undefined;

    this._init();
    this.Location.X = v2.X;
    this.Location.Y = v2.Y;
};



/*Inherit shape object*/
Duedo.Circle.prototype = Object.create(Duedo.Shape.prototype);
Duedo.Circle.prototype.constructor = Duedo.Circle;



/*
 * Intersects
 * Static method
 * Check intersection between two circles
*/
Duedo.Circle.Intersects = function ( c1, c2 ) {

    // TODO CHECK AND UPDATE CODE

    var A, B, ABD;

    A = c2.Origin.X - c1.Origin.X;
    B = c2.Origin.Y - c1.Origin.Y;

    ABD = Math.sqrt( Math.pow(A, 2) + Math.pow(B, 2) );

    if(ABD < (c1.Radius + c2.Radius))
    {
        return true;
    }


    return false;

};


/*
 * Clone
 * Clone this object
*/
Duedo.Circle.prototype.Clone = function() {

    return new Duedo.Circle(this.Location.X, this.Location.Y, this.Radius);

};


/*
 * GetAxes
 * Circle must return undefined / infinite
*/
Duedo.Circle.prototype.GetAxes = function () {
    return undefined; //infinite
};


/*
 * Project
 * Project this circle along the axis represented by @axis
*/
Duedo.Circle.prototype.Project = function (axis) {
    
    var scalars = [];
    var point = new Duedo.Point();
    var dotProduct = new Duedo.Vector2(point).DotProduct(axis);

    scalars.push(dotProduct);
    scalars.push(dotProduct + this.Radius);
    scalars.push(dotProduct - this.Radius);


    return new Duedo.Projection(Math.min.apply(Math, scalars), Math.max.apply(Math, scalars));

};


/*
 * Contains
 * @x: can be a vector2 or a scalar
 * @y: y coord
 * Check if this circle containes the point represented by the arguments
*/
Duedo.Circle.prototype.Contains = function(x, y) {

    if(x instanceof Duedo.Vector2)
    {
        y = x.Y;
        x = x.X;
    }

    if(this.Radius <= 0)
    {
        return false;
    }

    let objLoc = null;

    if(!this.FixedToViewport) {
    objLoc = this.Location.Clone()
        .Subtract( new Duedo.Vector2(x, y) )
        .Subtract(this.Game.Viewport.View.GetAsVector())
        .Double();
    } else {
        objLoc = this.ViewportOffset.Clone()
            .Subtract( new Duedo.Vector2(x, y) )
            .Double();
    }
    
    const r2 = this.Radius * this.Radius;

    return (objLoc.X + objLoc.Y <= r2);

};


/*
 * IntersectCircle
 * @cs: circle 2
 * Check if this circle intersects the circle represented by c2
*/
Duedo.Circle.prototype.IntersectCircle = function ( c2 ) {
    return Duedo.Circle.Intersects(this, c2);
};


/*
 * CreatePath
 * @context: 2d context
*/
Duedo.Circle.prototype.CreatePath = function (context) {
    context.beginPath();
    context.arc(
        DUnits.M2P(this.Location.X),
        DUnits.M2P(this.Location.Y),
        DUnits.M2P(this.Radius),
        0,
        Math.PI * 2,
        false
    );
};


/*
 * GetPosition
*/
Duedo.Circle.prototype.GetPosition = function () {
    return this.Origin;
};


/*
 * Origin
*/
Object.defineProperty(Duedo.Circle.prototype, "Origin", {

    get: function() {
        return this.Location;
    }

});


Object.defineProperty(Duedo.Circle.prototype, "Width", {

    get: function () { return this.Radius * 2; }

});

Object.defineProperty(Duedo.Circle.prototype, "Height", {

    get: function () { return this.Radius * 2; }

});
