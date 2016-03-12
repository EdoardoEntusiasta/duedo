
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

            var mbg = new Duedo.Image(game, game.Cache.GetImage("bg_menu"));
            mbg.Location.Y = -70;
            mbg.Draggable = true;
            mbg.DragBringToTop = true;
            this.Add(mbg);

            bbg = new Duedo.Image(game, game.Cache.GetImage("bg_menu_buttons"));
            bbg.Location.SetBoth(50);
            bbg.Draggable = true;
            bbg.DragBringToTop = true;
            bbg.Alpha = 0;
            bbg.FixedToViewport = true;
            bbg.ViewportOffset = game.Viewport.Center.Clone();
            bbg.Scale.SetBoth(0);
            bbg.Z = 9;
            this.Add(bbg);

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
            
            btn_enter = new Duedo.Image(game, game.Cache.GetImage("enter"));
            btn_enter.Alpha = 0;
            btn_enter.Draggable = true;
            btn_enter.FixedToViewport = true;
            btn_enter.ViewportOffset = game.Viewport.Center.Clone().SubtractScalar(50);
            btn_enter.ViewportOffset.Y -= 40;
            btn_enter.ViewportOffset.X -= 30;
            btn_enter.Z = 10;
            btn_enter.OnPointerOn = function () {
                game.SoundManager.Play("btn_over");
                btn_enter.Alpha = 1;
            };
            btn_enter.OnPointerOut = function () { this.Alpha = 0.5; }
            this.Add(btn_enter);

            game.Camera.Animate({
                Location: { X: 30 }
            }, 5, "Linear").Yoyo();



            var window = new Duedo.Rectangle(new Duedo.Vector2(20, 20), 300, 300);
            window.FillColor = "black";
            window.Z = 20;
            window.Draggable = true;
            window.Rotation = 0.9;
            window.Animate({
                Location: {X:400}
            }, 5, "EaseIn");
            window.Scale.SetBoth(0);

            child = new Duedo.Rectangle(new Duedo.Vector2(-60, 20), 30, 30);
            child.Interactive = true;
            child.Name = "BOTTONE";
            child.Draggable = true;
            child.OnPointerUp = function () { this.FillStyle = "red"; };
            window.OnPointerUp = function () { this.FillStyle = "red"; };
            window.Attach(child);
            child.Animate({
                Offset: {X: 200}
            }, 5, "Linear");
            
           
            this.Add(window);
        },
        Enter: function () {
            //Play ost
            //this.Game.SoundManager.Play("ost_menu").Repeat = Infinity;

            bbg.Animate({
                ViewportOffset: {X: 380, Y: 10},
                Scale: { X: 0.8, Y: 0.8 },
                Alpha: 1
            }, 2, "EaseOut").Bind("complete", function () {
                btn_enter.Animate({
                    Alpha: 0.5
                }, 1, "EaseOut");
            });
            
            

        },
        Update: function () {
            if(Keyboard.KeyState(Duedo.Keyboard.SPACEBAR))
            {
                game.Renderer.SwitchRenderer();
            }   
        }

    }



    game.StateManager.AddState("quadtree", quad, true);
}






function prepareTilemap() {

    var map = new Duedo.Tilemap(game, game.Cache.Get("rock"));
    map.CreateLayer(
        [
            [0, 100, game.Cache.Get("rock")],
            [100, 100, game.Cache.Get("rock")],
            [200, 100, game.Cache.Get("rock")],
            [300, 100, game.Cache.Get("rock")]
        ],
    100, 0, 10);


    map.JoinGame();


};