var activeObj = null;
var select;
var qz = 99;
var line;
var rect;




var PATH_GAME = "0test/";


function ADD_QUADTREETEST() {



    var quad = {

        bbg: null,
        btn_enter: null,
        pssnow: null,

        Load: function () {
            this.Game.Loader.AddResource(PATH_GAME + "src/bgs/bg_menu.jpg");
            this.Game.Loader.AddResource(PATH_GAME + "src/buttons/enter.png");
            this.Game.Loader.AddResource(PATH_GAME + "src/tilemaps/rock.jpg");
            this.Game.Loader.AddResource(PATH_GAME + "src/bgs/bg_menu_buttons.png");
            this.Game.Loader.AddResource(PATH_GAME + "src/music/ost_menu.mp3");
            this.Game.Loader.AddResource(PATH_GAME + "src/sounds/btn_over.mp3");
        },
        Create: function () {
            var obs;

            q = new Duedo.QuadTree(this.Game, 0, new Duedo.Rectangle(new Duedo.Vector2(0, 0),
                game.World.Width, game.World.Height));

            game.InteractivityManager.UseQuadTree(q);
            prepareTilemap();

            pssnow = new Duedo.ParticleSystem(game, "menu_snow");
            pssnow.Z = 11;
            
            pssnow.Draggable = true;
            pssnow.FixedToViewport = true;
            pssnow.ViewportOffset.X = 100;
            pssnow.LocationRandom.X = this.Game.Viewport.View.Width;
            pssnow.Gravity.Y = 0.1;
            pssnow.ViewportOffset.Y = -20;
            pssnow.Size = 5;
            pssnow.SizeRandom = 10;
            this.Add(pssnow);            

        },
        Enter: function () {
            //Play ost
            //this.Game.SoundManager.Play("ost_menu").Repeat = Infinity;
            

        },
        Update: function () {

        }

    }



    game.StateManager.AddState("quadtree", quad, true);
}






function prepareTilemap() {

    var map = new Duedo.Tilemap(game, game.Cache.Get("rock"), 50, 50);
    map.CreateLayer(
        [
            [0,   400, game.Cache.Get("rock"), true],
            [50, 400, game.Cache.Get("rock"), true],
            [100, 400, game.Cache.Get("rock"), true],
            [150, 400, game.Cache.Get("rock"), true],
            [200, 400, game.Cache.Get("rock"), true],
            [250, 400, game.Cache.Get("rock"), true],
            [300, 400, game.Cache.Get("rock"), true],
        ],
    100, 0, 10);


    map.JoinGame();


};