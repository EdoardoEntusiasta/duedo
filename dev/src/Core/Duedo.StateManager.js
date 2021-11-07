/*
==============================
Duedo.StateManager
Author: http://www.edoardocasella.it

Prepared while studying the Phaser.js code, thanks to Richard Davey
==============================
*/

Duedo.StateManager = function ( gameContext ) {
    
    this.Game = gameContext || Duedo.Global.Games[0];
    this.Loader;
    this.SoundM;
    this.Events;

    /*States stack*/
    this._States;
    this._StatesLength;
    this._CurrentState = null;
    this._ForthcomingState;

    this._STDStateMethods;
    this._CreatedStates = {};

    /*Delay*/
    this._DelayStateChange = null;
    this._DelayStartTime;
    this._Ready = false;
    this._init();
};




/*
 * _init
 * @private
*/
Duedo.StateManager.prototype._init = function () {
    
    /*States stack*/
    this._States = {};
    this._StatesLength = 0;
    this._CurrentState = null;
    this._ForthcomingState = null;
    this._StateLoading = false;

    /*Quick references to game managers*/
    this.Loader   = this.Game.Loader;
    this.SoundM   = this.Game.SoundManager;
    this.Events   = this.Game.Events;
    this.Viewport = this.Game.Viewport;
    this.Input    = this.Game.InputManager;
    
    /*STD State template*/
    this._STDStateMethods = {
        "StateData"   : {}, // Object to store the state's relative data
        "Load"        : null,
        "LoadUpdate"  : null,
        "Added"       : null,
        "Zoom"        : null, // When camera has been zoomed @param - zoomLevel
        "Update"      : null, // Each frame @param - deltaT
        "Create"      : null,
        "Enter"       : null,
        "Exit"        : null,
        "PausedUpdate": null,
        "Pause"       : null,
        "Resumed"     : null,
        "Destroy"     : null,
        "Render"      : null
    }


    return this;

};



/*
 * RemoveState
 * @public
*/
Duedo.StateManager.prototype.RemoveState = function ( stateName ) {
    

    if( this._States[stateName] )
    {

        if( stateName === this._CurrentState )
        {
            this.FreeFromState();
        }

        delete this._States[stateName];
        
        this._StatesLength--;
    }

};



/*
 * CurrentState
 * return: _currentState
*/
Duedo.StateManager.prototype.CurrentState = function() {
    return this._CurrentState;
};



/*
 * AddState
 * @public
*/
Duedo.StateManager.prototype.AddState = function( stateName, DUEDOState, start ) {

    DUEDOState.Game = this.Game;
    
    if( Duedo.Utils.IsNull(start) )
    {
        start = false;
    }


    if( Duedo.Utils.IsNull(stateName) )
    {
        stateName = "state_" + this._StatesLength;
    }

    /*Add state*/
    this._States[stateName] = DUEDOState;


    /*Increment StatesLength*/
    this._StatesLength++;


    /*Check autostart*/
    if( start )
    {
        if( this.Game.Running )
        {
            this.StartState( stateName );
        }
        else
        {
            this._ForthcomingState = stateName;
        }
    }
    
    return DUEDOState;

};



/*
 * DelayStateChange
 * Delay next state enter
*/
Duedo.StateManager.prototype.DelayStateChange = function( time ) {
    this._DelayStateChange = time;
};



/*
 * StartState
 * @public
*/
Duedo.StateManager.prototype.StartState = function( stateName ) {

    if( this._States[stateName] )
    {
        this._ForthcomingState = stateName;
    }

};



/*
 * SwitchState
 * @private
*/
Duedo.StateManager.prototype.ActivateState = function ( stateName ) {

    //Link methods
    for( var i in this._STDStateMethods )
    {
        if(!Duedo.Utils.IsNull(this._States[stateName][i]))
        {
            this[i] = this._States[stateName][i];
        }
    }
            
    /*Set _CurrentState*/
    this._CurrentState  = stateName;
    this._Ready = false;
};



/*
 * PreUpdate
 * @public
 * Manages the transitions between states
*/
Duedo.StateManager.prototype.PreUpdate = function(deltaT) {

    if(this._StateLoading)
    {
        this._UpdateLoading();
    }
    else
    {
        if(this._ForthcomingState)
        {
            /*if delay state change*/
            if(!Duedo.Utils.IsNull(this._DelayStateChange))
            {   
                if(!this._DelayStartTime)
                    this._DelayStartTime = this.Game.ElapsedTime;

                if(this.Game.ElapsedTime <= (this._DelayStartTime + this._DelayStateChange))
                {
                    return;
                }
                else
                {
                    this._DelayStateChange = null;
                    this._DelayStartTime   = null;
                }
            }

            if(this._ForthcomingState === this._CurrentState)
                return this._ForthcomingState = null;

            /*Exit from current state*/
            if(this._CurrentState !== null)
            {
                if(!Duedo.Utils.IsNull(this["Exit"]))
                    this.Exit.call(this._States[this._CurrentState]);

                this.FreeFromState();
            }

            /*Activate forthcoming state*/
            this.ActivateState(this._ForthcomingState);


            /*Preload or start state*/
            if(!Duedo.Utils.IsNull(this["Load"]) && !this._CreatedStates[this._ForthcomingState])
            {
                this.Load.call(this._States[this._CurrentState]);
                this.Game.Loader.StartLoading();
                this._StateLoading = this._ForthcomingState; 
            }
            else
            {
                this._LoadCompleted();
                this._EnterState();
            }

            this._ForthcomingState = null;

        } else {
            // Check messages
            if(this.Game._ReadMessage('zoomed')) {
                Object.keys(this._States).forEach(stateKey => {
                    const state = this._States[stateKey];
                    if(!Duedo.Utils.IsNull(state['Zoom'])) {
                        state.Zoom.call(this._States[this._CurrentState], this.Game.Viewport.Zoom);
                    }
                });
            }
        }
    }


    return this;
};



/*
 * UpdateLoading
 * @private
*/
Duedo.StateManager.prototype._UpdateLoading = function() {

    if(!Duedo.Utils.IsNull(this["LoadUpdate"]))
    {
        this.LoadUpdate.call(this._States[this._CurrentState], this.Game.DeltaT);
    }

    if(!this.Game.Loader.Loading)
    {
        this._LoadCompleted();
        this._EnterState();
    }
};



/*
 * _LoadCompleted
 * @private
 * It is called when a state is loaded
*/
Duedo.StateManager.prototype._LoadCompleted = function() {

    if( !this._Ready && !Duedo.Utils.IsNull(this["Create"]) && !this._CreatedStates[this._StateLoading])
    {
        this._Ready = true;
        this["Create"].call(this._States[this._CurrentState]);
    }
    else
    {
        this._Ready = true;
    }

    this._CreatedStates[this._StateLoading] = true;
    this._StateLoading = false;

    return this;

};



/*
 * _EnterState
 * @private
*/
Duedo.StateManager.prototype._EnterState = function() {

    if( !Duedo.Utils.IsNull(this["Enter"]) )
    {
        this["Enter"].call(this._States[this._CurrentState]);
    }

}



/*
 * UpdateState
 * Calls the custom update function for the current state
 * @public
*/
Duedo.StateManager.prototype.UpdateState = function() {

    if( !Duedo.Utils.IsNull(this["Update"]) && this._Ready)
    {
        this["Update"].call(this._States[this._CurrentState], this.Game.DeltaT);
    }


};



/*
 * RenderState
 * Render some additional things from the current state
 * [!]Will be rendered last
*/
Duedo.StateManager.prototype.RenderState = function (ctx) {

    if (!Duedo.Utils.IsNull(this["Render"]) && this._Ready) {
        this["Render"].call(this._States[this._CurrentState], ctx);
    }

};



/*
 * FreeFromState
*/
Duedo.StateManager.prototype.FreeFromState = function() {

    /*Destroy state methods*/
    for ( var i in this._STDStateMethods )
    {
        this[i] = null;
    }

};



/*
 * Destroy
*/
Duedo.StateManager.prototype.Destroy = function() {
    
    this.FreeFromState();

    this._States = {};
    this._StatesLength = 0;
    this._ForthcomingState = null;
    this._CurrentState = null;
    this._CreatedStates = {};

};



/*
 * Add/AddEntity
 * Register entity to his relative state
 * !Called once per state in "Create"
*/
Duedo.StateManager.prototype.Add = function( DUEDOObject ) { 
    return this.AddEntity(DUEDOObject); 
};
Duedo.StateManager.prototype.AddEntity = function( DUEDOObject ) {

    if( !DUEDOObject || typeof DUEDOObject === "undefined" )
    {
        return null;
    }
        
    this.Game.Add(DUEDOObject);
    
    return DUEDOObject;
};