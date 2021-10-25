/*
==============================
Duedo.GameContext
Author: http://www.edoardocasella.it

Notes:
Manage all the core objects, calculate deltaTime, update and render the game

Exposed objects:
Viewport
InputManager (Keyboard...)
StateManager
SoundManager
Loader
Cache
Time
...
==============================
*/


/*Global*/
Duedo.Global = {
    //Game instances
    Games: [],
    Id: 0,
    PreviousEntity: null
};


/*Next id*/
Duedo.NextId = function() {
    return ++Duedo.Global.Id;
};



/* GameContext
 * @canvas:       destination canvas (as node element)
 * @WWMinX:       world min x 
 * @WWMinY:       world min y
 * @WWMaxX        world max x
 * @WWMaxY        world max y
 * @enablePhysics (bool) request a physics world
 * @RendererType: canvas or webgl
 *
 *
 * >>> IMPORTANT: this engine works with METERS <<<
*/
Duedo.GameContext = function (canvas, WWMaxX, WWMaxY, bool_enablePhysics, rendererType) {
    this._Cache = {};

    //GameContext
    this.Renderer;
    this.Loader;
    this.Cache;
    this.World;
    this.SoundManager;
    this.StateManager;
    this.SpeechRecognition;
    this.Viewport;
    /*Camera: viewport reference*/
    this.Camera;
    this.Events;
    this.Time;
    this.Input;
    this.InputManager;
    this.Stage;
    this.Entities;
    this.PhysicsEngine;

    /*Debug informations update and render*/
    this.DebugStorage;

    /*1.0 is one second*/
    this.DeltaT;
    this.MaxDeltaT = 1;
    this.MinDeltaT = 0.0001; 
    this.Tick      = 0;
    this.ElapsedTime;
    
    /*Space scale*/
    this.SpaceScale = Duedo.Conf.PixelsInMeter; //pixels in a meter
    if(!this.SpaceScale) {
        throw "Error: you must specify a relationship between pixels and meters";
    }
    
    /*Core loop properties*/
    this._Running = true;
    this._LoopID = null;
    this.__Booted = false;
    this.TimeoutLoop = null;

    this._ClientInfoInitialized = false;

    this._IsMobile = false;

    this._Breakpoints = null;

    //Setup
    this._Boot(canvas, WWMaxX, WWMaxY, bool_enablePhysics, rendererType);
};

/* Constructor */
Duedo.GameContext.prototype.constructor = Duedo.GameContext;


/*
 * _Boot
 * @private
 * Initialize all the core objects
*/
Duedo.GameContext.prototype._Boot = function ( canvas, WWMaxX, WWMaxY, bool_enablePhysics, renderer ) {
    
    var scope = this;
    var Browser;
    
    Duedo.Global.Games.push(this);

    /*Entities*/
    this.Entities = [];
    /*Time/Tick*/
    this.ElapsedTime = 0;
    this.DeltaT      = 0;
    this.Tick        = 0;

    //Instantiate time manager, start counting
    this.Time = new Duedo.Time(true);
    /*New cache*/
    this.Cache = new Duedo.Cache(this);
    //Instantiate a new Loader
    this.Loader = new Duedo.Loader(this, this.Cache);
    /*Prepare requestAnimationFrame*/
    this.UseRequestAnimationFrame();
    /*Renderer*/
    this.__NewRenderer(Duedo.Null(renderer) ? Duedo.Renderers.CANVAS : renderer, canvas);
    /*Instantiate a state manager*/
    this.StateManager = new Duedo.StateManager(this);
    /*Input manager*/
    this.InputManager = new Duedo.InputManager(this);
    /*Interactivity manager*/
    this.InteractivityManager = this.InputManager.InteractivityManager;
    /*Events manager*/
    this.Events = new Duedo.Events(this);
    //Instantiate a new SoundManager
    this.SoundManager = new Duedo.SoundManager(this);
    //Create an initial basic world and a viewport
    this.World = new Duedo.World(this, WWMaxX, WWMaxY);
    //Create Viewport
    this.Camera = this.Viewport = new Duedo.Viewport(this, this.Renderer.Canvas.width, this.Renderer.Canvas.height);
    //Stage
    this.Stage = new Duedo.Stage(this);
    /*Instantiate physics engine*/
    if(bool_enablePhysics === true) {
        this.PhysicsEngine = new Duedo.PhysicsEngine(this);
    }
    if(Duedo.Conf.SplashScreen)
        this.StartSplashScreen();

    /*Currently running*/
    this._Paused = false;

    /*Start looping*/
    if(Duedo.Conf.AutoLooping)    
    {
        this.__RunTicks();
    }
    else
    {
        //otherwise you have to do this manually
        //using your own custom looping function that calls MyGame.Simulate(game, deltatime)
    }

    this.StartBreakpointsListener();
    this._StartMobileCheck();

    this.__Booted = true;
    this._PostBoot();
    return this;
};


/*
 * __initRenderer
 * @private
 * Initialize renderer component
*/
Duedo.GameContext.prototype.__NewRenderer = function(r, c) {

    if(Duedo.Utils.AreNull([r, c]))
        throw "GameContext:__initRenderer: error while initializing renderer component";
    
    /*Renderer, canvas | webgl*/
    this.Renderer = new Duedo.Renderer(this, c, r);

    return this;
};


/**
 * _StartMobileCheck
 * void
 */
Duedo.GameContext.prototype._StartMobileCheck = function() {
    window.addEventListener('resize', () => {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        this._IsMobile = check;
    });
}


/**
 * StartBreakpointsListener
 * @returns 
 */
Duedo.GameContext.prototype.StartBreakpointsListener = function() {

    if(!this._Breakpoints) {
        return false;
    }

    const wCheck = () => {
        const windowWidth = window.screen.width /*window.innerWidth*/;
        Object.keys(this._Breakpoints).forEach(breakPointKey => {
            // todo other sizes
            // TAXE THE NEXT BIGGER NUMBER THAN INNERWIDTH
            if(windowWidth < breakPointKey) {
                this._ResizeCanvas(this.Breakpoints[breakPointKey].Width, this.Breakpoints[breakPointKey].Height);
            } else {
                
            }
        })
    }
    window.addEventListener('resize', () => {
        wCheck.call(this);
    });
    wCheck();
}



/**
 * _ResizeCanvas
 * @param {*} width 
 * @param {*} height 
 */
Duedo.GameContext.prototype._ResizeCanvas = function(width, height) {
    this.Renderer.Canvas.width = width;
    this.Renderer.Canvas.height = height;
    // Reset viewport
    this.Viewport.Reset(width, height);
}



/*
 * Reboot the main core
 * @param then: function to execute after reboot 
*/
Duedo.GameContext.prototype.Reboot = function (then) {

    var g = this;

    if(g.__Booted)
        g._Boot(
            g.Renderer.Canvas,
            g.World.Bounds.Width,
            g.World.Bounds.Height,
            g.PhysicsEngine.Enabled,
            g.Renderer.RendererType
        );


    if (Duedo.IsFunc(then))
        then.call();

    return this;
};



/*
 * _PostBoot
 * Read and exe options
*/
Duedo.GameContext.prototype._PostBoot = function () {

    /*Show FPS*/
    if (Duedo.Conf.DrawFPS) {
        var fpst = new Duedo.Text("FPS: -----");
        fpst.FixedToViewport = true;
        fpst.Style.Fill = "white";
        this._Cache["FPS"] = this.Add(fpst);
    }
};




/*
 * TODO:
 * Create and add the Duedo Splash Screen
*/
Duedo.GameContext.prototype.StartSplashScreen = function() {
    
};



/*
 * Add
 * @object: DUEDO object
 * Add an object to the currently running GameContext
*/
Duedo.GameContext.prototype.Add = function( object ) {

    if(Duedo.Utils.IsNull(object)){
        return null;
    }

    /*Internal info*/
    object.Id = Duedo.__GenNextObjID();
    object.ParentState = this.StateManager.CurrentState();

    /*Add into main stage*/
    if(Duedo.Null(object.ParentState)) 
        object.ParentState = -1; //omnipresent

    /*Push entity*/
    this.Entities.push(object);

    /*Object BornTime*/
    object.BornTime = this.ElapsedTime;

    /*Request to sort the planes by the Z index*/
    this.Renderer.SortPlanes = true;
    
    /*Call on stage add trigger*/
    if (!Duedo.Utils.IsNull(object["_CallTriggers"])) {
        object._CallTriggers("stageadd");
    }

    return object;

};

/*Just for order or convenience*/
Duedo.GameContext.prototype.AddEntity = Duedo.GameContext.prototype.Add;



/*
 * FPS
 * Calculate FPS
*/
Duedo.GameContext.prototype.FPS = function (dt) {
    if (Duedo.Utils.IsNull(dt))
        dt = this.DeltaT;
    return (1.0 / ((dt + dt) / 2.0));
};



/*
 * _Loop
 * private
 * Core auto main loop
*/
Duedo.GameContext.prototype.__RunTicks = function() {

    if( !this.Running ) 
        return;
    
    this.__Step();

    //Call next tick and mem the current LoopID
    this._LoopID = requestAnimationFrame(this.__RunTicks.bind(this));

};



/*
 * __Step
 * @private
 * Progress the game
*/
Duedo.GameContext.prototype.__Step = function() {

    /*Get deltaT*/
    var DeltaT = this.Time.Delta();

    if (Duedo.Null(DeltaT) || DeltaT < 0)
    {
        throw "Duedo.GameContext.__Step: deltaT is undefined or < 0";
    }

    /*Limit delta time*/
    this.DeltaT = DeltaT > this.MaxDeltaT ? this.MaxDeltaT : DeltaT;
    this.DeltaT = DeltaT < this.MinDeltaT ? this.MinDeltaT : DeltaT;
    
    try
    {
        this.ElapsedTime += this.DeltaT;
        this.Tick++;
        //ADD: this.tick, this.ElapsedTime: If we're exceeding the 32-bit?
    }
    catch (e)
    {
        throw "Error: " + e.message;
    }

    /*Update the game state*/
    this.Simulate(this, this.DeltaT);

};





/*
 * Simulate
 * @public
 * Game main loop - the beating heart
 * Set mygame.AutoLooping = false to write your own custom call of this function
 * @Game: an instance of Duedo.GameContext
 * @dt: delta time
*/
Duedo.GameContext.prototype.Simulate = function (Game, dt) {

        Game.InputManager.Update(dt);
        Game.StateManager.PreUpdate();
        if(Game.PhysicsEngine)
            Game.PhysicsEngine.PreUpdate(dt);
        Game.Stage.PreUpdate(dt);
        Game.Viewport.PreUpdate();
        
        if (!Duedo.Utils.IsNull(Game.SpeechRecognition)) 
            Game.SpeechRecognition.Update(dt);
        
        Game.StateManager.UpdateState();
        Game.Events.Update(dt);
        Game.Stage.Update(dt);
        Game.World.Update(dt);
        Game.Viewport.Update(dt);
        Game.SoundManager.Update(dt);
        if(Game.PhysicsEngine)
            Game.PhysicsEngine.Update(dt);

        Game.Stage.PostUpdate(dt);
        Game.InputManager.PostUpdate(dt);
        Game.Viewport.PostUpdate(dt);
        if(Game.PhysicsEngine)
            Game.PhysicsEngine.PostUpdate(dt);

        Game.Renderer
            .PreRender()
            .Render()
            .PostRender();
            
};




/*
 * UseRequestAnimationFrame
 * Thanks to PIXI.js 
 * Get requestAnimationFrame function
 * IncludeS a polyfill of the API
*/
Duedo.GameContext.prototype.UseRequestAnimationFrame = function() {

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];

    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) 
    {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    /*SetTimeout, POLYFILL*/
    if (!window.requestAnimationFrame) {

        var that = this;

        //Create a requestAnimationFrame-like function
        window.requestAnimationFrame = function (callback) {

            var currTime = new Date().getTime();

            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            
            that.TimeoutLoop = window.setTimeout(function() { 
                callback(currTime + timeToCall); 
            }, timeToCall);

            lastTime = currTime + timeToCall;
            
            return that.TimeoutLoop;
        };
    }

    if (!window.cancelAnimationFrame) 
    {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }


    window.requestAnimFrame = window.requestAnimationFrame;


};


/*
 * StopLooping
 * public
 * Stop core game loop
*/
Duedo.GameContext.prototype.StopLooping = function() {

    if(this.TimeoutLoop)
    {
        cancelAnimationFrame(this.TimeoutLoop);
    }
    else
    {
        cancelAnimationFrame(this._LoopID);
    }
    
    this.Running = false;
};
Duedo.GameContext.prototype.Stop = Duedo.GameContext.prototype.StopLooping;


/*
 * StartSpeechRecognition
 * Start using GOOGLE speech recognition
 * ? To add a voice command: mygame.SpeechRecognition.AddCommand("phrase", callback);
 * BETA
*/
Duedo.GameContext.prototype.StartSpeechRecognition = function ( autostart, onstart, onend  ) {
    
    this.SpeechRecognition = new Duedo.SpeechRecognition(autostart);
    
    if( !this.SpeechRecognition )
    {
        return false;
    }
    else
    {
        /*Init callbacks listeners*/
        if (onstart !== null && !Duedo.Null(onstart))
        {
            this.SpeechRecognition.Recognizer.onstart  = onstart  || null;
        }
        
        if (onend !== null && !Duedo.Null(onend))
        {
            this.SpeechRecognition.Recognizer.onend = onend || null;
        }
        
    }

    return this.SpeechRecognition;

};




/*
 * Running
 * public
*/
Object.defineProperty(Duedo.GameContext.prototype, "Running", {

    get: function() {
        return this._Running;
    },

    set: function( value ) {
        this._Running = value;
    }

});


/*
 * Debug
 * @public
 * Start or stop debugging informations update and render
*/
Object.defineProperty(Duedo.GameContext.prototype, "Debug", {

    set: function(bool) {
        
        if(bool === true)
        {
            this.DebugStorage = new Duedo.DebugStorage(this);

        }
        else
        {
            this.DebugStorage.Clear();
            this.DebugStorage = null;
        } 
    },


    get: function() {
        return !Duedo.Utils.IsNull(this.DebugStorage);
    }

});


/*
 * Breakpoints
 * public
*/
Object.defineProperty(Duedo.GameContext.prototype, "IsMobile", {

    get: function() {
        return this._IsMobile;
    },

});


/*
 * Breakpoints
 * public
*/
Object.defineProperty(Duedo.GameContext.prototype, "Breakpoints", {

    get: function() {
        return this._Breakpoints;
    },

    set: function( value ) {
        this._Breakpoints = value;
        this.StartBreakpointsListener();
    }

});




/*
 * Cast
 * @public
 * Create an instance of a Duedo object (ex: Spritesheet, Rectangle, ParticleSystem etc...)
 * Game.Cast("Rectangle", new Duedo.Vector2(10, 10), 100, 100);
 *
 * OR apply a further collection of custom properties values:
 * Game.Create("Rectangle", new Duedo.Vector2(10, 10), 100, 100, {
    Z: 99,
    FillStyle: "rgba(255, 255, 255, 1)"
 });
 * PERCH� NON E' COMPLETA? 
 * Non tutti gli oggetti Duedo accettano il parametro GameContext, ma in molti � necessario
 * quindi � impossibile capire quali di questi hanno bisogno di un primo parametro game e quali no
 *
 * SOLUZIONE:
 * GLI OGGETTI CHE RICHIEDONO IL PARAMETRO GAME SONO QUELLI CHE HANNO UNA PROPRIETA' GameContext
 
Duedo.GameContext.prototype.Cast = function (constructor) {
    
    if (Duedo.Utils.IsNull(Duedo[constructor]))
        return null;
    else
    {
       
        delete arguments[0]; //constructor var

        var instance = null,
            proto_argslength = Duedo[constructor].length;
        
        //From object to array
        arguments = [].slice.call(arguments);
        
        var array_args = [];
        ar = arguments;
        for (var i in ar)
        {
            if (array_args.length <= proto_argslength)
            {
                array_args.push(ar[i]);
            }
            else
            {
                break;
            }
        }
        
        
        if ("Radius" in Duedo[constructor].prototype)
            alert();

        console.log(Duedo[constructor].constructor);
        //array_args.unshift(this);
        //Controlla se ha GameContext 

        function f() {
            return Duedo[constructor].apply(this, array_args);
        }
        
        f.prototype = Duedo[constructor].prototype;

        //Create a Duedo obj instance
        instance = new f();
        instance.Game = this;

        //Check for extra object properties
        for (var i in arguments)
            if (arguments[i] instanceof Object)
                for (var x in arguments[i]) {
                    instance[x] = arguments[i][x];
                    alert(x);
                }
        instance.Z = 1000;
        console.log(instance);
        this.Add(instance);
        return instance;
        
    }

};
*/
