var activeObj = null;
var select;
var qz = 99;
var line;
var rect;

var Cache = game.Cache;
var Ph = game.PhysicsEngine;


var PATH_GAME = "0test/";


/* ======================
 * Game state (test)
*/
function ADD_QUADTREETEST() {



    var quad = {

        bbg: null,
        btn_enter: null,
        pssnow: null,

        Load: function () {
            this.Game.Loader.AddResource(PATH_GAME + "src/bgs/city1.jpg");
            this.Game.Loader.AddResource(PATH_GAME + "src/tilemaps/rock.jpg");
            this.Game.Loader.AddResource(PATH_GAME + "src/sprites/samus.png");
            this.Game.Loader.AddResource(PATH_GAME + "src/anims/metroidAnim.json");
            this.Game.Loader.AddResource("src/ParticleSystem/Presets/PSFire.json");
        },
        Create: function () {
            var obs;

            //q = new Duedo.QuadTree(this.Game, 0, new Duedo.Rectangle(new Duedo.Vector2(0, 0),
              //  game.World.Width, game.World.Height));

            //game.InteractivityManager.UseQuadTree(q);
            prepareMap();

            var player = new Player();

            game.Add(player.Sprite);
            game.Add(player);
            //game.Camera.Follow(player.Sprite);
            rect = new Duedo.Rectangle(new Duedo.Vector2(50, 50), 100, 100);
            rect.Z = 100;
            rect.Draggable = true;
            game.Add(rect);

        },
        Enter: function () {
            //Play ost
            //this.Game.SoundManager.Play("ost1").Repeat = Infinity;
            

        },
        Update: function () {
            
        }

    }

    game.StateManager.AddState("quadtree", quad, true);
}









/* ======================
 * Player (test)
*/
Player = function() {

    this.Body;
    this.Sprite;

    this.Jumping = false;
    this.OnGround = false;
    this.PrintCheck = true;
    this.Init();
};


Player.prototype.Init = function() {
    
    /*Add spritesheet*/
    this.Sprite = new Duedo.SpriteSheet(game, Cache.GetImage("samus"), 'player');
    this.Sprite.Load(game.Cache.GetJSON("metroidAnim"));
    this.Sprite.PlaySequence("standleft");
    this.Sprite.Name = "metroid";
    this.Sprite.Z = 2;
    this.Sprite.Scale.SetBoth(1.3);
    this.Sprite.Location.X = 240;
    this.Sprite.Location.Y = 20;

    /*Add body*/
    this.Body = new Duedo.Body(game, this.Sprite, Ph.RectangleBody(this.Sprite.Location.Clone(), this.Sprite.Width, this.Sprite.Height, {friction:0, mass:15}), "player");
    this.Sprite.Body = this.Body;
    this.Body.PreventRotation = true;
    Ph.AddBody(this.Body);

    return this;

};

/*
 * Update
*/
Player.prototype.Update = function() {

    if(Keyboard.KeyState(Duedo.Keyboard.RIGHT)) {
        this.Body.ApplyForce(new Duedo.Vector2(0, -1), new Duedo.Vector2(0.04, 0));
        this.Sprite.PlaySequence("runright");
    }
    else if(Keyboard.KeyState(Duedo.Keyboard.LEFT)) {
        this.Body.ApplyForce(new Duedo.Vector2(-500, -1), new Duedo.Vector2(-0.04, 0));
        this.Sprite.PlaySequence("runleft");
    }
    else {
        if(this.RunningLeft())
            this.Sprite.PlaySequence("standleft");
        else if (this.RunningRight()) {
            this.Sprite.PlaySequence("standright");
        }
        this.Body.SetLocation(this.Body.Location.X, this.Body.Location.Y);
        this.Body.ResetForces();
    }
    if(Keyboard.KeyState(Duedo.Keyboard.UP)) {
       this.Jump();
       this.PrintCheck = false;
       this.Sprite.PlaySequence("jumping");
    }
    if(Keyboard.KeyState(Duedo.Keyboard.T)) {
       console.log(Ph.CastRay(this.Body.Shape, new Duedo.Vector2(0,400), new Duedo.Vector2(1000,400), 500));
    }


    if(this.Body.Collisions().length) {
        if(this.Body.Collisions()[0].normal.y == 1) {
            this.OnGround = true;
        }
    }

};



Player.prototype.Jump = function() {
     if(!this.OnGround) return;
     this.Body.ApplyForce(new Duedo.Vector2(0, 400), new Duedo.Vector2(0, -0.5));
     this.OnGround = false;
};


Player.prototype.RunningRight = function() {
    return parseInt(this.Body.Velocity.X) > 0;
};


Player.prototype.RunningLeft = function() {
    return parseInt(this.Body.Velocity.X) < 0;
};



/* ======================
 * PrepareMap (test)
*/
function prepareMap() {

    var map = new Duedo.Tilemap(game, game.Cache.Get("rock"), 50, 50);
    map.Z = 30;
    /*Rock body*/
    var options = {
        angle: 0
    };
    

    options.mass =2;
    options.isStatic = false;
     options.stiffness = -1;
     options.friction = 0;

    map.CreateLayer(
        [
            [190,   0, game.Cache.Get("rock"), options, "falling-rock"]
        ],
    100, 0, 10);
    
    options.isStatic = true;

    map.CreateLayer(
        [
            [100,   400, game.Cache.Get("rock"), options, "rock"],
            [150,   400, game.Cache.Get("rock"), options, "rock"],
            [200,   400, game.Cache.Get("rock"), options, "rock"],
            [250,   400, game.Cache.Get("rock"), options, "rock"],
            [300,   400, game.Cache.Get("rock"), options, "rock"],
            [350,   400, game.Cache.Get("rock"), options, "rock"],
            [400,   400, game.Cache.Get("rock"), options, "rock"],
            [450,   400, game.Cache.Get("rock"), options, "rock"],
            [500,   400, game.Cache.Get("rock"), options, "rock"],
            [550,   350, game.Cache.Get("rock"), options, "rock"],
            [600,   350, game.Cache.Get("rock"), options, "rock"],
            [650,   400, game.Cache.Get("rock"), options, "rock"],
        ],
    100, 0, 10);


    map.JoinGame();


    ps = new Duedo.ParticleSystem(game, "fire");
    ps.Z = 10;
    ps.Load(Cache.GetJSON("PSFire"));
    ps.Location.X = 500;
    ps.Location.Y = 370;
    game.Add(ps);



};