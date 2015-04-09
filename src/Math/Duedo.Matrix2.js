/*
==============================
Duedo.Matrix2
Author: http://www.edoardocasella.it
==============================
*/

Duedo.Matrix2 = function (n11, n12, n21, n22) {
    
    /*Matrix array*/
    this.Matrix = new Array();

    return this.Set(
        n11, n12,
        n21, n22
    );
};


Duedo.Matrix2.prototype.GetMatrix = function () {
    return this.Matrix;
};


Duedo.Matrix2.prototype.Set = function (n11, n12, n21, n22) {
    this.Matrix[0] = n11; this.Matrix[1] = n12;
    this.Matrix[2] = n21; this.Matrix[3] = n22;
    return this;
};


Duedo.Matrix2.prototype.Determinant = function () {
    return (this.Matrix[0] * this.Matrix[3]) - (this.Matrix[2] * this.Matrix[1]);
};


Duedo.Matrix2.prototype.Clone = function () {
    return new Duedo.Matrix2(this.Matrix[0], this.Matrix[1], this.Matrix[2], this.Matrix[2]);
};