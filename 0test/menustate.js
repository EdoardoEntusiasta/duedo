var activeObj = null;
var select;
var qz = 99;
var line;
var rect;

var Cache = game.Cache;
var Ph = game.PhysicsEngine;


var PATH_GAME = "0test/";


function ADD_QUADTREETEST() {



    var quad = {

        bbg: null,
        btn_enter: null,
        pssnow: null,

        Load: function () {
            this.Game.Loader.AddResource(PATH_GAME + "src/bgs/city1.jpg");
            this.Game.Loader.AddResource(PATH_GAME + "src/tilemaps/rock.jpg");
            this.Game.Loader.AddResource(PATH_GAME + "src/music/ost1.mp3");
            this.Game.Loader.AddResource(PATH_GAME + "src/sprites/samus.png");
            this.Game.Loader.AddResource(PATH_GAME + "src/anims/metroidAnim.json");
        },
        Create: function () {
            var obs;

            //q = new Duedo.QuadTree(this.Game, 0, new Duedo.Rectangle(new Duedo.Vector2(0, 0),
              //  game.World.Width, game.World.Height));

            //game.InteractivityManager.UseQuadTree(q);
            prepareTilemap();

            var player = new Player();

            game.Add(player.Sprite);
            game.Add(player);

            rect = new Duedo.Rectangle(new Duedo.Vector2(50, 50), 100, 100);
            rect.Z = 100;
            rect.Draggable = true;
            game.Add(rect);
                
            /*
            bg1 = new Duedo.Image(game, game.Cache.GetImage("city1"));
            bg1.Draggable = true;
            bg1.Location.SetBoth(-400);
            game.Add(bg1);
        */




        },
        Enter: function () {
            //Play ost
            this.Game.SoundManager.Play("ost1").Repeat = Infinity;
            

        },
        Update: function () {
            
        }

    }

    game.StateManager.AddState("quadtree", quad, true);
}


Player = function() {

    this.Body;
    this.Sprite;

    this.Init();
};


Player.prototype.Init = function() {
    
    /*Add spritesheet*/
    this.Sprite = new Duedo.SpriteSheet(game, Cache.GetImage("samus"), 'player');
    this.Sprite.Load(game.Cache.GetJSON("metroidAnim"));
    this.Sprite.PlaySequence("standleft");
    this.Sprite.Name = "metroid";
    this.Sprite.Z = 30;
    this.Sprite.Scale.SetBoth(1.3);
    this.Sprite.Location.X = 240;
    this.Sprite.Location.Y = 20;

    /*Add body*/
    this.Body = new Duedo.Body(game, this.Sprite, Ph.RectangleBody(this.Sprite.Location.Clone(), this.Sprite.Width, this.Sprite.Height, {mass:10, friction:1000, airFriction:1000}));
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
        this.Body.ApplyForce(new Duedo.Vector2(0, 400), new Duedo.Vector2(0.03, 0));
        this.Sprite.PlaySequence("runright");
    }
    else if(Keyboard.KeyState(Duedo.Keyboard.LEFT)) {
        this.Body.ApplyForce(new Duedo.Vector2(0, 400), new Duedo.Vector2(-0.03, 0));
        this.Sprite.PlaySequence("runleft");
    }
    else {
        this.Sprite.PlaySequence("standright");
    }
    if(Keyboard.KeyState(Duedo.Keyboard.UP)) {
        this.Body.ApplyForce(new Duedo.Vector2(0, 400), new Duedo.Vector2(0, -0.02));
    }


};





function prepareTilemap() {

    var map = new Duedo.Tilemap(game, game.Cache.Get("rock"), 50, 50);
    map.Z = 200;
    /*Rock body*/
    var options = {
        angle: 0
    };
    

    options.mass =2;
    options.isStatic = false;
     options.density = 10000000;
     options.stiffness = 10;
     options.chamfer = {};
    options.chamfer.radius = 20;

    map.CreateLayer(
        [
            [130,   0, game.Cache.Get("rock"), options]
        ],
    100, 0, 10);
    
    options.isStatic = true;

    map.CreateLayer(
        [
            [100,   400, game.Cache.Get("rock"), options],
            [150,   400, game.Cache.Get("rock"), options],
            [200,   400, game.Cache.Get("rock"), options],
            [250,   400, game.Cache.Get("rock"), options],
            [300,   400, game.Cache.Get("rock"), options],
            [350,   400, game.Cache.Get("rock"), options],
            [400,   400, game.Cache.Get("rock"), options],
            [450,   400, game.Cache.Get("rock"), options],
            [500,   400, game.Cache.Get("rock"), options],
            [550,   350, game.Cache.Get("rock"), options],
            [600,   350, game.Cache.Get("rock"), options],
            [650,   400, game.Cache.Get("rock"), options],
        ],
    100, 0, 10);


    map.JoinGame();


};