
/*
==========================================
TEST GAME
==========================================
*/

var keyb = null, px;

/*References*/
var Keyboard;


//Main
function duedoMain() {

    if(!Duedo.Utils.Can.Duedo())
        return;

    var screen = document.getElementById("screen");

    game = new Duedo.GameContext(screen, 2500, 1000, true);

    
    game.Debug = true;
    game.PhysicsEngine.Debug = true;
    game.PhysicsEngine.Enabled = true;
    game.PhysicsEngine.UseQuadTree();
    game.Viewport.Debug = false;


    game.Loader.AddResource();
    px = game.PhysicsEngine;
    var Gamepath = "0test";
    Duedo.Require([
    	Gamepath + "/menustate.js"
        ], 
   		initGame);
        
};




/*
==========================================
INIT GAME
==========================================
*/
function initGame() {
    
    //Get shortcuts
    input = game.Input;
    Keyboard = game.InputManager.Keyboard;
    mouse = game.InputManager.Mouse;

    
    rect = new Duedo.Rectangle(new Duedo.Vector2(50, 50), 100, 100);
    rect.Z = 100;
    rect.Draggable = true;
    game.Add(rect);
    //Configure
    ConfigureGame();
    
    //Add game states
    ADD_QUADTREETEST();
}



/*
==========================================
CONFIGURE GAME
==========================================
*/
function ConfigureGame() {

    /*Enable camera dragging*/
    game.Viewport.EnableDragging = true;
    game.Viewport.DragSupportKey = Duedo.Keyboard.CONTROL;
    game.Viewport.DragPreventFollow = true;

    /*Se il mouse esce dalla canvas | annulla un possibile pulsante attivo*/
    mouse.OutCallback = function() {
        this.Null(this.ActiveButton);
    };


    game.PhysicsEngine.StartMouseConstraint(1, 1);

};




/*
==========================================
TEST STRING
==========================================
*/
function test(str, concat) {

    if(concat === undefined)
    {
        document.getElementById('test').innerText = str;
    }
};



var enemy = function () {

};


enemy.prototype.Update = function () {

    

};