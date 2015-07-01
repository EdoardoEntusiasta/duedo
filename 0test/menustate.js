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

            game.Add(CreatePlayer());

            rect = new Duedo.Rectangle(new Duedo.Vector2(50, 50), 100, 100);
            rect.Z = 100;
            rect.Draggable = true;
            game.Add(rect);
                

            bg1 = new Duedo.Image(game, game.Cache.GetImage("city1"));
            bg1.Draggable = true;
            bg1.Location.SetBoth(-400);
            game.Add(bg1);





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





function CreatePlayer() {

    var player = new Duedo.SpriteSheet(game, Cache.GetImage("samus"), 'player');
    //player.Load(game.Cache.GetJSON("metroidAnim"));
    //player.PlaySequence("runright");
    player.Name = "metroid";
    player.Z = 30;
    player.Width = 310;
    player.Height = 200;
    player.Scale.SetBoth(1.8);
    player.Location.X = 130;
    player.Location.Y = 20;
            

    /*
    var ph_playerbody = new Duedo.Body(game, player, Ph.RectangleBody(new Duedo.Vector2(0, 0), 40, 100, {mass:10}));
    player.Body = ph_playerbody;
    Ph.AddBody(player.Body);
    */
    return player;

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
            [120,   400, game.Cache.Get("rock"), options],
        ],
    100, 0, 10);


    map.JoinGame();


};