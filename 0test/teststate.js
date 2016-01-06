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
            this.Game.Loader.AddResource(PATH_GAME + "src/tilemaps/rock.jpg");
            this.Game.Loader.AddResource(PATH_GAME + "src/sounds/aug_gun.mp3");
            this.Game.Loader.AddResource(PATH_GAME + "src/music/track.mp3");
            this.Game.Loader.AddResource(PATH_GAME + "src/images/ball.png");
            this.Game.Loader.AddResource(PATH_GAME + "src/sprites/samus.png");
            this.Game.Loader.AddResource(PATH_GAME + "src/anims/metroidAnim.json");
            this.Game.Loader.AddResource("src/ParticleSystem/Presets/PSFire.json");
            this.Game.Loader.AddResource("src/ParticleSystem/Presets/PSFire.json");
        },
        Create: function () {
            var obs;
            if(px)
            px.Debug = true;
            //q = new Duedo.QuadTree(this.Game, 0, new Duedo.Rectangle(new Duedo.Vector2(0, 0),
              //  game.World.Width, game.World.Height));

            //game.InteractivityManager.UseQuadTree(q);
            prepareMap();

        },
        Enter: function () {
            //Play ost
            this.Game.SoundManager.Play("track").Repeat = Infinity;


        },
        Update: function () {

        }

    }

    game.StateManager.AddState("quadtree", quad, true);
}












/* ======================
 * PrepareMap (test)
*/
function prepareMap() {
    game.Camera.View.Location.X = 503;

    var Sprite = new Duedo.SpriteSheet(game, Cache.GetImage("samus"), 'player');
    Sprite.Load(game.Cache.GetJSON("metroidAnim"));

    Sprite.Name = "metroid";
    Sprite.Z = 2;
    Sprite.Location.X = 3;
    Sprite.Location.Y = 0;
    Sprite.PlaySequence("standleft");

    Body = Ph.RectBody(new Duedo.Vector2(3, 1), 0.5, 1, {friction:10, restitution:0, density:0.2});
    Sprite.Rotation = 5;


    var a = {};
    var player = new Duedo.Entity(game, Sprite);

    player.AddBody(Body);
    player.Body.SetFixedRotation(true);
    player.Jumping = false;
    player.OnGround = false;
    player.PrintCheck = true;

    player.Update = function() {

         if(!this.Sprite.Body) return;

           if(Keyboard.KeyState(Duedo.Keyboard.RIGHT)) {
               vel = this.Sprite.Body.GetLinearVelocity();
               vel.x = 10;
               this.Sprite.Body.SetLinearVelocity(vel);
               this.Sprite.PlaySequence("runright");
            }
            else if(Keyboard.KeyState(Duedo.Keyboard.LEFT)) {
               vel = this.Sprite.Body.GetLinearVelocity();
               this.Sprite.PlaySequence("runleft");
               vel.x = -10;
               this.Sprite.Body.SetLinearVelocity(vel);
            } else {
                vel = this.Sprite.Body.GetLinearVelocity();

               if(vel.x > 0) {
                this.Sprite.PlaySequence("standright");
                }
                else if(vel.x < 0) {
                    this.Sprite.PlaySequence("standleft");
                }

            }

                  vel = this.Sprite.Body.GetLinearVelocity();
                //console.log(vel);

            if(Keyboard.KeyState(Duedo.Keyboard.UP)) {
                this.Sprite.Body.ApplyForce( new b2Vec2(0,-150), this.Sprite.Body.GetWorldCenter() );
            }

            if(Keyboard.KeyState(Duedo.Keyboard.CONTROL)) {
                var self = this;
                //Event after 0.2ms (shot)
                game.Events.AddEvent('shot', function() {
                  var prj = Ph.RectBody(new Duedo.Vector2(self.Sprite.Location.X+0.7, self.Sprite.Location.Y), 0.5, 0.2, {density:1});
                  prj.ApplyForce(new b2Vec2(300,-140), prj.GetPosition());
                }, 1, 0.2);
                this.Game.SoundManager.Play("aug_gun");
            }
    };

    player.Generate();

    game.Camera.Follow(player.Sprite);

    addBall();

    Ph.RectBody(new Duedo.Vector2(0, 5), 100, 2, {isStatic:true});
};



function addBall() {

    rect = new Duedo.Rectangle(new Duedo.Vector2(4, 1), 100, 100);
    rect.Z = 100;
    rect.Draggable = true;
    game.Add(rect);
    //rect.FixedToViewport = true;

    ball = new Duedo.Image(game, game.Cache.GetImage("ball"));
    ball.Width = 1;
    ball.Height = 1;
    ball.Location.X = 10;
    ball.Location.Y = 10;
    //ball.Body = Ph.CircleBody(new Duedo.Vector2(10, 1), 0.5, {restitution:1, density:10, friction:2});
    ball.Draggable = true;
    ball.FixedToViewport = true;

    game.Add(ball);

    ball.OnPointerOn = function() {
        console.log(this);
        this.Alpha = 0.4;
    };
    ball.OnPointerOut = function() {
        this.Alpha = 1;
    };

    rect.OnPointerOn = function() {
        console.log(this);
        this.Alpha = 0.4;
    };
    rect.OnPointerOut = function() {
        this.Alpha = 1;
    };

};
