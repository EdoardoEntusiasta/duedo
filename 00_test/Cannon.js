









/*
==============================
CANNON
==============================
*/
function Cannon(x, y) {


    /* QUESTE 2 PROPRIETà SONO OBBLIGATORIE */
    this.Location = new Duedo.Vector2(x,y);
    this.InUse = true;

    this.Direction = "right";

    this.PipeLocation = new Duedo.Vector2(x, y);
    this.SpriteSheet;
    this.Height = 60;
    this.Width = 120;
    this.Angle = 0;
    this.LoadedShot = null;
    this.ProjInitVel = new Duedo.Vector2(0, 0);

    this.PSystem = new Duedo.ParticleSystem();


    this.MouseOver = false;
};


Cannon.prototype = new Duedo.Object();


Cannon.prototype.Update = function ( deltaT ) {



    if (input.KeyState("keyW") || input.KeyState("keyUp")) {
        this.Angle -= 0.01;
        this.Location.Y -= 2;
    }
    else if (input.KeyState("keyS") || input.KeyState("keyDown"))
    {
        this.Angle += 0.01;
        this.Location.Y += 2;
    }
        

    if (input.KeyState("keyRight")) {
        this.Location.X += 4;
        this.SpriteSheet.PlaySequence("runright");
        this.Direction = "right";
    }
    else if(input.KeyState("keyLeft"))
    {
        this.Location.X -= 4;
        this.SpriteSheet.PlaySequence("runleft");
        this.Direction = "left";
        //this.SpriteSheet.PlaySequence("runright");
    }
    else
    {

    }


    if (this.Angle <= -(90 * Math.PI / 180))
        this.Angle = -(90 * Math.PI / 180);
    if (this.Angle >= -(15 * Math.PI / 180))
        this.Angle = -(15 * Math.PI / 180);


    //this.SpriteSheet.Location.Copy( this.Location );

    if (this.SpriteSheet.MouseHover()) {
        if (this.MouseOver === false)
        {
            //game.SoundManager.Play("select");
            this.MouseOver = true;
        }
            
    }
    else
    {
        //this.SpriteSheet.Alpha = 1;
        this.MouseOver = false;
    }
        

    
    /*Shot/load shot*/
    if (input.Mouse.LeftButton && this.SpriteSheet.MouseHover() || input.KeyState("keyCtrl"))
        this.LoadShot(deltaT);
    else if (this.LoadedShot) {
        this.Shot();
        this.LoadedShot = false;
        this.ProjInitVel.MultiplyScalar(0);
    }


    var pPos = this.PipeLocation;
    /*Traslo al centro*/
    pPos.X -= (this.Location.X + (this.Width / 2));
    pPos.Y -= (this.Location.Y + (this.Height / 2));
    /*Per la rotazione a distanza fissa con coordinate polari la lunghezza del vettore deve essere uguale*/
    pPos.Y = /*mag*/40 * Math.sin(this.Angle);
    pPos.X = /*mag*/40 * Math.cos(this.Angle);
    /*Traslo alla sua posizione originaria*/
    pPos.Y += (this.Location.Y + (this.Height / 2));
    pPos.X += (this.Location.X + (this.Width / 2));


    //this.SpriteSheet.Rotation = this.Angle;

};


/*
Cannon shot
==============================
*/
Cannon.prototype.Shot = function () {

    var origin, angle;

    origin = new Duedo.Vector2(this.PipeLocation.X - 10, this.PipeLocation.Y - 10);
    angle = this.Angle;

    this.ProjInitVel.X *= Math.cos(angle);
    this.ProjInitVel.Y *= Math.sin(angle);

    proj = new Projectile(origin, angle, this.ProjInitVel);
    proj.SpriteSheet = new Duedo.SpriteSheet(game.GetAsset("cannon_ball"));
    proj.SpriteSheet.Scale = 0.37;
    proj.SpriteSheet.Z = this.SpriteSheet.Z;
    proj.SpriteSheet.Location = proj.Location;
    proj.SpriteSheet.Rotation = angle;
    world.AddEntity(proj).AddEntity(proj.SpriteSheet);
    this.EmitSparkles(50);
    


    game.SoundManager.Play("cannon_shot", "cshot");
};


/*
Cannon loadShot
==============================
*/
Cannon.prototype.LoadShot = function (deltaT) {

    if (this.LoadedShot !== true)
        this.LoadedShot = true;

    /*Load initial velocity*/

    this.ProjInitVel.X += 12 * deltaT;
    if (this.ProjInitVel.X > 20)
        this.ProjInitVel.X = 20;

    this.ProjInitVel.Y = this.ProjInitVel.X;
};


Cannon.prototype.EmitSparkles = function (maxSparkles) {

    var ps = new Duedo.ParticleSystem();
    ps.Location = new Duedo.Vector2(this.PipeLocation.X, this.PipeLocation.Y);
    ps.LocationRandom = new Duedo.Vector2(0, 0);
    ps.Angle = this.Angle;
    ps.MaxParticles = maxSparkles;
    ps.AngleRandom = 0;
    

    ps.Load(game.GetAsset("ps_sparkles"));

    world.AddEntity(ps, 0);
};