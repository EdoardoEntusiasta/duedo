/*
==============================
Duedo.GameContext
Author: http://www.edoardocasella.it

Notes:
Manage all the core objects, calculate deltaTime, update and render the game
==============================
*/


/* GameContext
 * @canvas:       destination canvas (as node element)
 * @WWMinX:       world min x 
 * @WWMinY:       world min y
 * @WWMaxX        world max x
 * @WWMaxY        world max y
 * @enablePhysics (bool) request a physics world
 * @RendererType: canvas or webgl
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

    /*Core loop properties*/
    this._Running = true;
    this._LoopID = null;
    this.__Booted = false;
    this.TimeoutLoop = null;

    this._ClientInfoInitialized = false;

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
    /*Instantiate a state manager*/
    this.StateManager = new Duedo.StateManager(this);
    /*Renderer*/
    this.Renderer = new Duedo.Renderer(this, canvas, renderer || "canvas2d");
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
    this.PhysicsEngine = new Duedo.PhysicsEngine(this);
    if(bool_enablePhysics === true)
        this.PhysicsEngine.Enabled = true;

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

    this.__Booted = true;
    this._PostBoot();
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
        fpst.Draggable = true;
        fpst.ViewportOffset = new Duedo.Vector2(5, 2);
        this._Cache["FPS"] = this.Add(fpst);
    }

};


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
        Game.PhysicsEngine.PreUpdate(dt);
        Game.Stage.PreUpdate(dt);
        Game.Viewport.PreUpdate();
        if (Game.Debug)
            Game.DebugStorage.PreUpdate(dt);

        if (!Duedo.Utils.IsNull(Game.SpeechRecognition)) 
            Game.SpeechRecognition.Update(dt);
        Game.StateManager.UpdateState();
        Game.Events.Update(dt);
        Game.Stage.Update(dt);
        Game.World.Update(dt);
        Game.Viewport.Update(dt);
        Game.SoundManager.Update(dt);
        Game.PhysicsEngine.Update();
        if (Game.Debug)
            Game.DebugStorage.Update(dt);

        Game.Stage.PostUpdate(dt);
        Game.InputManager.PostUpdate(dt);
        Game.Viewport.PostUpdate(dt);
        if (Game.Debug)
            Game.DebugStorage.PostUpdate(dt);
        
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
 * Cast
 * @public
 * Create an instance of a Duedo object (ex: Spritesheet, Rectangle, ParticleSystem etc...)
 * Game.Create("Rectangle", new Duedo.Vector2(10, 10), 100, 100);
 *
 * OR apply a further collection of custom properties values:
 * Game.Create("Rectangle", new Duedo.Vector2(10, 10), 100, 100, {
    Z: 99,
    FillStyle: "rgba(255, 255, 255, 1)"
 });
 * PERCHé NON E' COMPLETA? 
 * Non tutti gli oggetti Duedo accettano il parametro GameContext, ma in molti è necessario
 * quindi è impossibile capire quali di questi hanno bisogno di un primo parametro game e quali no
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
