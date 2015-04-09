/*
==============================
PROJECTILE
==============================
*/
function Projectile(vec2Pos, angle, initVel) {


    this.Location = vec2Pos || undefined;
    this.InUse = true;


    this.Mass = 550;
    this.Angle = angle;
    this.Velocity = new Duedo.Vector2(initVel.X, initVel.Y);
    this.Height = 20;
    this.Width = 40;
    this.Acceleration = new Duedo.Vector2(0, 0);
    this.Fuel = 2;
    this.Maxvel = { x: 20, y: 20 };
    this.PSystem = null;
    this.Active = true;
    this.A = null;
    this.SpriteSheet;
};


Projectile.prototype.Update = function (deltaT) {

    if (!this.Active)
        return;

    /*Apply gravity*/
    this.ApplyForce(new Duedo.Vector2(0, deltaT * (20 * this.Mass)));
    this.ApplyAirFriction((30 * 1 * deltaT));

    //this.velocity.add(this.acceleration);
    this.Velocity.X += deltaT * (this.Acceleration.X);
    this.Velocity.Y += deltaT * (this.Acceleration.Y);
    this.Location.Add(this.Velocity);

    this.Angle = Math.atan2(this.Velocity.Y, this.Velocity.X);
    this.SpriteSheet.Rotate( this.Angle );
    if (this.Location.Y > 450)
        this.Destroy();



};



/*
Apply force
==============================
*/
Projectile.prototype.ApplyForce = function (vec2F) {
    this.Acceleration.Add(vec2F.DivideScalar(this.Mass));
};



Projectile.prototype.Destroy = function () {

    this.Active = false;
    var self = this;
    this.SpriteSheet.Animate({
        Alpha: 0
    }, 2, "Linear").Bind("complete", function () {
            self.SpriteSheet.InUse = false;
            self.InUse = false;
    });
    //world.RemoveEntity(this);
};

/*
Bound velocity
==============================
*/
Projectile.prototype.limitVelocity = function () {
    if (this.Velocity.X > this.Maxvel.X)
        this.Velocity.X = this.Maxvel.X;
    if (this.Velocity.X < -this.Maxvel.X)
        this.Velocity.X = -this.Maxvel.X;
    if (this.Velocity.Y > this.Maxvel.Y)
        this.Velocity.Y = this.Maxvel.Y;
    if (this.Velocity.Y < -this.Maxvel.Y)
        this.Velocity.Y = -this.Maxvel.Y;
};


/*
Is inside
==============================
*/
Projectile.prototype.isInside = function (pos, dim) {
    if (this.Location.X > pos.X
        && this.Location.X < pos.X + dim.width
        && this.Location.Y > pos.Y
        && this.Location.Y < pos.Y + dim.height)
        return true;
    return false;
};



/*
Drag
==============================
*/
/*
Projectile.prototype.Drag = function (liquid) {

    var vel = this.velocity.magnitude();
    var dM = liquid.density * (vel * vel);

    var drag = this.velocity.clone();

    drag.multiplyScalar(-1);
    drag.normalize();
    drag.multiplyScalar(dM);

    this.applyForce(drag);
};
*/

/*
Apply air friction
==============================
*/
Projectile.prototype.ApplyAirFriction = function (airFrictionC) {

    var vel;

    vel = this.Velocity.Clone();
    vel.Normalize();
    vel.Negate();
    vel.MultiplyScalar(airFrictionC);

    this.ApplyForce(vel);
};


Projectile.prototype.EmitSmoke = function (maxParticles) {

    

};

