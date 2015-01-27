/*
==============================
Duedo.Dimension
==============================
*/

Duedo.Dimension = function (width, height) {
    this.Type = Duedo.DIMENSION;

    this.Width = width || undefined;
    this.Height = height || undefined;

};


/*
Duedo.Dimension.clone
==============================
*/
Duedo.Dimension.prototype.Clone = function () {
    return new Duedo.Dimension(this.Width, this.Height);
};

Duedo.Dimension.prototype.ToArray = function () {
    
    var array = new Array();

    array[0] = this.Width;
    array[1] = this.Height;

    return array;
};

Duedo.Dimension.prototype.Set = function (width, height) {
    this.Width = width || undefined;
    this.Height = height || undefined;
    return this;
};

Duedo.Dimension.prototype.Area = function () {
    return this.Width * this.Height;
};

Duedo.Dimension.prototype.MultiplyScalar = function ( scalar ) {
    this.Width *= scalar;
    this.Height *= scalar;
    return this;
};

Duedo.Dimension.prototype.DivideScalar = function (scalar) {
    this.Width /= scalar;
    this.Height /= scalar;
    return this;
};

Duedo.Dimension.prototype.MultiplyVector = function(DUEDOVec2) {
    this.Width *= DUEDOVec2.X;
    this.Height *= DUEDOVec2.Y;
    return this;
};