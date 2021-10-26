/*
==========================================
Duedo.Vector2
Author: http://www.edoardocasella.it
==========================================
*/

Duedo.Vector2 = function (x, y) {

    this.X = (x || 0);
    this.Y = (y || 0);

};


/*PUBLIC STATIC*/
Duedo.Vector2.Compare = function (vec2a, vec2b) {
    
    if(Duedo.Utils.IsNull(vec2b) || Duedo.Utils.IsNull(vec2a))
        return false;
    
    return (vec2a.X === vec2b.X && vec2a.Y === vec2b.Y);
};


Duedo.Vector2.DotProduct = function (v1, v2) {
    return (v1.X * v2.X) + (v1.Y + v2.Y);
};

Duedo.Vector2.Subtract = function (v1, v2) {
    return new Duedo.Vector2(v1.X - v2.X, v1.Y - v2.Y);
};

Duedo.Vector2.Negate = function (v) {
    v.X *= -1;
    v.Y *= -1;
    return v;
};

Duedo.Vector2.Perpendicular = function (v, negate) {
    negate = negate === true ? -1 : 1;
    return new Duedo.Vector2(negate * -v.Y, negate * v.X);
};


/*PUBLIC METHODS*/
Duedo.Vector2.prototype.ToGenericObject = function() {
    return {x: this.X, y: this.Y};
}


Duedo.Vector2.prototype.ToArray = function () {
    return new Array(this.X, this.Y);
};

Duedo.Vector2.prototype.Set = function(x, y) { 
    this.X = x;
    this.Y = y;
    return this;  
};

Duedo.Vector2.prototype.SetBoth = function(scalar) {
    this.X = scalar;
    this.Y = scalar;
    return this;
};

Duedo.Vector2.prototype.AddScalar = function (scalar) {
    this.X += scalar;
    this.Y += scalar;
    return this;
};

Duedo.Vector2.prototype.SubtractScalar = function (scalar) {
    this.X -= scalar;
    this.Y -= scalar;
    return this;
};

Duedo.Vector2.prototype.MultiplyScalar = function (scalar) {
    this.X *= scalar;
    this.Y *= scalar;
    return this;
};

Duedo.Vector2.prototype.DivideScalar = function (scalar) {

    if (scalar === 0)
        return this.MultiplyScalar(0);

    this.X /= scalar;
    this.Y /= scalar;

    return this;
};

Duedo.Vector2.prototype.Add = function (vec2) {
    this.X += vec2.X;
    this.Y += vec2.Y;
    return this;
};

Duedo.Vector2.prototype.Subtract = function(vec2) {
    this.X -= vec2.X;
    this.Y -= vec2.Y;
    return this;
};

Duedo.Vector2.prototype.Multiply = function(vec2) {
    this.X *= vec2.X;
    this.Y *= vec2.Y;
    return this;
};

Duedo.Vector2.prototype.Divide = function(vec2) {
    this.X /= vec2.X;
    this.Y /= vec2.Y;
    return this;
};

Duedo.Vector2.prototype.DivideScalar = function (n) {
    
    var complex = 1.0 / n;

    if (complex === 0)
        this.X = this.Y = 0;
    else
    {
        this.X *= complex;
        this.Y *= complex;
    }
    
    return this;
};


Duedo.Vector2.prototype.DotProduct = function(vec2) {
    return (this.X * vec2.X) + (this.Y * vec2.Y);
};

Duedo.Vector2.prototype.GetPerpendicular = function() { 
    var pv = new Duedo.Vector2(0, 0);
    pv.X = this.Y;
    pv.Y = 0 - this.X;
    return pv;
};

Duedo.Vector2.prototype.Normal = function(){ 
    var pv = this.GetPerpendicular();
    return pv.Normalize();
};

Duedo.Vector2.prototype.Magnitude = function () {
    return Math.sqrt(Math.pow(this.X, 2) + Math.pow(this.Y, 2));
};

Duedo.Vector2.prototype.Normalize = function () {
    
    var mag = this.Magnitude();
    if (mag != 0)
        this.DivideScalar(mag);
    return this;
};

Duedo.Vector2.prototype.Edge = function (vec2) {
    this.Subtract(vec2);
    return this;
};

Duedo.Vector2.prototype.SetX = function (x) {
    this.X = x;
    return this;
};

Duedo.Vector2.prototype.SetY = function (y) {
    this.Y = y;
    return this;
};

Duedo.Vector2.prototype.GetX = function () {
    return this.X;
};

Duedo.Vector2.prototype.GetY = function () {
    return this.Y;
};

Duedo.Vector2.prototype.Clone = function () {
    return new Duedo.Vector2(this.X, this.Y);
};

Duedo.Vector2.prototype.Translate = function (tx, ty) {
    if (tx instanceof Duedo.Vector2)
    {
        return this.Add(tx);
    } 
    else
    {
        this.X += tx;
        this.Y += ty;
        return this;
    }
};

Duedo.Vector2.prototype.SetMagnitude = function (mag) {
    this.Normalize();
    return this.MultiplyScalar(mag);
};

Duedo.Vector2.prototype.Negate = function () {
    return this.MultiplyScalar(-1);
};

Duedo.Vector2.prototype.DistanceTo = function (vec2) {
    var dx = this.X - vec2.X, dy = this.Y - vec2.Y;
    return dx * dx + dy * dy;
};

Duedo.Vector2.prototype.SetFromArray = function (array) {
    this.X = array[0];
    this.Y = array[1];
    return this;
};

Duedo.Vector2.prototype.Equals = function (vec2) {
    return (this.X === vec2.X && this.Y === vec2.Y);
};

Duedo.Vector2.prototype.SetFromMax = function (vec2) {
    if (this.X < vec2.X)
        this.X = vec2.X;
    if (this.Y < vec2.Y)
        this.Y = vec2.Y;
    return this;
};

Duedo.Vector2.prototype.SetFromMin = function (vec2) {
    if (this.X > vec2.X)
        this.X = vec2.X;
    if (this.Y > vec2.Y)
        this.Y = vec2.Y;
    return this;
};

Duedo.Vector2.prototype.Copy = function (vec2) {
    this.X = vec2.X;
    this.Y = vec2.Y;
    return this;
};


Duedo.Vector2.prototype.ApplyMatrix2 = function (matrix2) {
    this.X = this.X * matrix2[0] + this.Y * matrix2[1];
    this.Y = this.X * matrix2[2] + this.Y * matrix2[3];
    return this;
};


Duedo.Vector2.prototype.GetAngle = function () {
    return Math.atan2(this.Y, this.X);
};

Duedo.Vector2.prototype.Abs = function () {
    this.X = Math.abs(this.X);
    this.Y = Math.abs(this.Y);
    return this;
};

Duedo.Vector2.prototype.Limit = function ( /*scalar*/ l) {
    if (this.Magnitude() > l)
        this.SetMagnitude(l);
    return this;
}

Duedo.Vector2.prototype.SetMagnitude = function ( /*scalar*/ m) {
    this.Normalize();
    this.MultiplyScalar(m);
    return this;
}