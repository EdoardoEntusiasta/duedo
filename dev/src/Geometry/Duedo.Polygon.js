/*
==========================================
Polygon
Author: http://www.edoardocasella.it
Based on Core HTML5 Canvas by David Geary and some stuff from StackOverflow
==========================================
*/


/*

 Polygon points order

     P1-------------P2
     |               |
     |               |
     P4-------------P3

*/

Duedo.Polygon = function (points) {
    Duedo.Shape.call(this);
    this.Type = Duedo.POLYGON;
   
    this.StrokeStyle = 'blue';
    this.FillStyle   = 'white';
    this.Wireframe = false;

    this._init(points);
};


/*Inherit shape object*/
Duedo.Polygon.prototype = Object.create(Duedo.Shape.prototype);
Duedo.Polygon.prototype.constructor = Duedo.Polygon;


Duedo.Polygon.prototype._init = function (points) {
    this._super();

    this.Points = points || null;

    if (Duedo.Utils.IsNull(this.Points))
        return;

    this.Location.X = this.Points[0].X;
    this.Location.Y = this.Points[0].Y;

    this.LastLocation = this.Location.Clone();

    return this;
};


Duedo.Polygon.prototype.Project = function (axis) {

    var scalars = [], v;

    v = new Duedo.Vector2();

    this.Points.forEach(function (point) {
        v.X = point.X;
        v.Y = point.Y;
        scalars.push(v.DotProduct(axis));
    });

    return new Duedo.Projection(Math.min.apply(Math, scalars), Math.max.apply(Math, scalars));
};


Duedo.Polygon.prototype.GetAxes = function () {

    var v1 = new Duedo.Vector2();
    var v2 = new Duedo.Vector2();
    var axes = [];

    for (var i = 0; i < this.Points.length - 1; i++) {

        v1.X = this.Points[i].X;
        v1.Y = this.Points[i].Y;

        v2.X = this.Points[i + 1].X;
        v2.Y = this.Points[i + 1].Y;

        axes.push(v1.Edge(v2).Normalize());
    }

    v1.X = this.Points[this.Points.length - 1].X;
    v1.Y = this.Points[this.Points.length - 1].Y;

    v2.X = this.Points[0].X;
    v2.Y = this.Points[0].Y;

    axes.push(v1.Edge(v2).Normalize());

    return axes;
};


Duedo.Polygon.prototype.AddPoint = function (x, y) {

    if (x instanceof Duedo.Point)
    {
        y = x.Y;
        x = x.X;
    }

    this.Points.push(new Duedo.Point(x, y));
    //The barycenter and area must be computed again
    this.Cache["cm"] = null;
    this.Cache["area"] = null;
};


Duedo.Polygon.prototype.GetPosition = function () {
    return this.Points[0];
};


/*http://stackoverflow.com/a/16391873*/
Duedo.Polygon.prototype.Contains = function (x, y) {
    
    var p = new Duedo.Point(x, y);

    // TODO PIXELS A METRI
    
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    var inside = false;
    for (var i = 0, j = this.Points.length - 1 ; i < this.Points.length; j = i++ )
    {
        if ( ( this.Points[ i ].Y > p.Y ) != ( this.Points[ j ].Y > p.Y ) &&
             p.X < ( this.Points[ j ].X - this.Points[ i ].X ) * ( p.Y - this.Points[ i ].Y ) / ( this.Points[ j ].Y - this.Points[ i ].Y ) + this.Points[ i ].X )
        {
            inside = !inside;
        }
    }

    return inside;

};


Duedo.Polygon.prototype.CreatePath = function (context) {

    if (this.Points.length === 0)
        return;

    context.beginPath();
    context.moveTo(this.Points[0].X, this.Points[0].Y);

    for (var i = 0; i < this.Points.length; ++i)
        context.lineTo(this.Points[i].X, this.Points[i].Y);

    context.closePath();

};


Duedo.Polygon.prototype.Move = function (dx, dy) {

    for (var i = 0, point; i < this.Points.length; ++i) {
        this.Points[i].X += dx;
        this.Points[i].Y += dy;
    }


    this.Location = this.Points[0].Clone().AsVector();

    //Barycenter must be updated @FIX, center must be only translated
    this.Cache["cm"] = null;
};


Duedo.Polygon.prototype.Translate = function (x, y) {
    var tx = x - this.Points[0].X;
    var ty = y - this.Points[0].Y;
    this.Move(tx, ty);

    //Barycenter must be updated @FIX, center must be only translated
    this.Cache["cm"] = null;
};


/*
 * ScalePoints
 * to be used instead of GraphicObject.Scale (Duedo.Vector2) property
*/
Duedo.Polygon.prototype.ScalePoints = function (scaleValX, scaleValY) {

    for (var i in this.Points) {
        this.Points[i].X *= scaleValX;
        this.Points[i].Y *= scaleValY;
    }

    this.Location = this.Points[0].Clone().AsVector();


    //Barycenter must be updated
    this.Cache["cm"] = null;

};


Duedo.Polygon.prototype.Clone = function () {

    var clonedP = new Array();

    for (var i in this.Points) {
        clonedP[i].X = this.Points[i].X;
        clonedP[i].Y = this.Points[i].Y;
    }

    return new Duedo.Polygon(clonedP);
};


Duedo.Polygon.prototype.GetHeight = function () {
    throw 'getHeight() not implemented';
};


Duedo.Polygon.prototype.GetWidth = function () {
    throw 'getWidth() not implemented';
};

/*
 * Rotate
 * Default: around his CM
*/
Duedo.Polygon.prototype.Rotate = function (rad, origin) {
    
    if(!origin)
        origin = this.Center;

    for (var i in this.Points)
        this.Points[i].Rotate(rad, origin);


    this.Angle = rad;

    this.Location = this.Points[0].Clone().AsVector();

    //Barycenter must be updated
    this.Cache["cm"] = null;
};


/*Area*/
Duedo.Polygon.prototype.Area = function () {

    var area = 0, i, j, p1, p2;

    for (i = 0, j = this.Points.length - 1; i < this.Points.length; j = i, i++) {
        p1 = this.Points[i];
        p2 = this.Points[j];
        area += p1.X * p2.Y;
        area -= p1.Y * p2.X;
    }

    area /= 2;

    
    return area;
};


/*Centre of mass*/
/*CACHE??*/
Object.defineProperty(Duedo.Polygon.prototype, "Center", {

    get: function () {
        
        //Compute CM
        var x = 0, y = 0, i, j, f, point1, point2;

        for (i = 0, j = this.Points.length - 1; i < this.Points.length; j = i, i++) {
            point1 = this.Points[i];
            point2 = this.Points[j];
            f = point1.X * point2.Y - point2.X * point1.Y;
            x += (point1.X + point2.X) * f;
            y += (point1.Y + point2.Y) * f;
        }

        f = this.Area() * 6;

        return new Duedo.Point(x / f, y / f);
    }

});