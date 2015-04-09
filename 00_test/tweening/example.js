//A global game variable
var mygame;
 
//Duedo optional main function
function duedoMain() {
	setTimeout(begin, 1000);
};



function begin() {

    var worldwidth = 3000;
    var worldheight = 1000;
    var enablephysics = false;
    var canvas = document.getElementById("screen");
 
    Duedo.Conf.DuedoSplashScreen = false;

    //Create a new game context
    mygame = new Duedo.GameContext(canvas, worldwidth, worldheight, enablephysics);

    //Preload spritesheet
    mygame.Loader.AddResource("media/metroidSS.gif");
    mygame.Loader.AddResource("media/metroidAnim.json");
    mygame.Loader.Bind("complete", addSpritesheet);
    mygame.Loader.StartLoading();

    $("#screen").appendTo(".canvas-container");

};





function addSpritesheet() {
    
    samus = new Duedo.SpriteSheet(mygame, mygame.Cache.GetImage("metroidSS"));

/*
    samus.AddSequence("runright", [
            [9,293, 23,42], 
            [47,292,29,43],
            [88,292,35,43],
            [131,293,32,42],
            [181,293,19,42],
            [219,293,22,42],
            [255,292,29,43],
            [297,292,35,43],
            [347,293,32,42],
            [396,293,18,42]
        ]);
*/
    samus.Load(mygame.Cache.GetJSON("metroidAnim"));
    samus.PlaySequence("runright");

    mygame.Add(samus);

};