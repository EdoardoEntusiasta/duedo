/*
==========================================
Polygon Box
Author: http://www.edoardocasella.it
==========================================
*/


Duedo.Box = function ( min, max ) {
    this.min = (min !== undefined) ? min : new Duedo.Vec2(0, 0);
    this.max = (max !== undefined) ? max : new Duedo.Vec2(0, 0);
};

Duedo.Box.prototype = new Duedo.Polygon();

Duedo.Box.prototype.getHeight = function () {
    this.min.y = Math.min(this.points[0].y, this.points[1].y, this.points[2].y, this.points[3].y);
    this.max.y = Math.max(this.points[0].y, this.points[1].y, this.points[2].y, this.points[3].y);
    return this.max.y - this.min.y;
};

Duedo.Box.prototype.getWidth = function () {
    this.min.x = Math.min.apply(this.points[0].x, this.points[1].x, this.points[2].x, this.points[3].x);
    this.max.x = Math.max.apply(this.points[0].x, this.points[1].x, this.points[2].x, this.points[3].x);
    return this.max.x - this.min.x;
};

Duedo.Box.prototype.getCenter = function () {

    /*
    var cosa, sina, wp, hp;

    cosa = Math.cos(this.theta);
    sina = Math.sin(this.theta);

    wp = this.width / 2;
    hp = this.height / 2;

    return new Duedo.Vec2(this.x + wp * cosa - hp * sina, this.y + wp * sina + hp * cosa);
    */
    return new Duedo.Vec2(0, 0);
    //return new Duedo.Vec2(this.points[0].x + (this.getWidth() / 2), this.points[0].y + (this.getHeight() / 2));
};

Duedo.Box.prototype.rotate = function (rad, origin) {

    this.theta = rad;
    if (this.theta > Math.PI * 2)
        this.theta = 0;

    alert(this.getHeight());

    this.points[0].rotate(this.theta, origin);
    this.points[1].rotate(this.theta, origin);
    this.points[2].rotate(this.theta, origin);
    this.points[3].rotate(this.theta, origin);
    return this;
};
