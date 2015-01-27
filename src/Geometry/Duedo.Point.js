/*
==========================================
Point
==========================================
*/

Duedo.Point = function (x, y) {
    this.Type = Duedo.POINT;
    
    this.X = x || 0;
    this.Y = y || 0;

};



Duedo.Point.prototype.Clone = function () {
    return new Duedo.Point( this.X, this.Y );
};

Duedo.Point.prototype.ToGenericObject = function() {
    return {
        x: this.X,
        y: this.Y
    }
};


Duedo.Point.prototype.AsVector = function () {
    return new Duedo.Vector2(this.X, this.Y);
};

Duedo.Point.prototype.Set = function(x, y) {
    this.X = x;
    this.Y = y;
    return this;
};

Duedo.Point.prototype.SetBoth = function(scalar) {
    this.X = scalar;
    this.Y = scalar;
    return this;
};

Duedo.Point.prototype.Add = function (p) {
    this.X += p.X;
    this.Y += p.Y;
    return this;
};


Duedo.Point.prototype.DistanceTo = function (vec2) {
    var dx = this.X - vec2.X, dy = this.Y - vec2.Y;
    return dx * dx + dy * dy;
};

Duedo.Point.prototype.Rotate = function (rad, center) {

    var dx, dy;
    dx = this.X - center.X;
    dy = this.Y - center.Y;
    this.X = center.X + (dx * Math.cos(rad) - dy * Math.sin(rad));
    this.Y = center.Y + (dx * Math.sin(rad) + dy * Math.cos(rad));
    return this;
};
